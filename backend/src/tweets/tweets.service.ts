import { ConflictException, Injectable } from '@nestjs/common';
import { Tweet } from './schema/tweet.schema';
import { CreateTweetDto } from './dto/createTweet.dto';
import { UsersService } from 'src/users/users.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<Tweet>,
    private userService: UsersService,
  ) {}

  async Publish(createTweet: CreateTweetDto): Promise<Tweet> {
    let createdTweet = new this.tweetModel(createTweet);
    let user = await this.userService.findById(createTweet.from);
    user.tweets.push(createdTweet);
    try {
      await createdTweet.save();
      await user.save();
      return;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Your Tweet shouldn´t be empty');
      }
      throw error;
    }
  }
}
