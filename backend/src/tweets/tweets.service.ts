import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Tweet } from './schema/tweet.schema';
import { CreateTweetDto } from './dto/createTweet.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<Tweet>,
    private userService: UsersService,
  ) {}
  async GetById(tweetId: string): Promise<Tweet> {
    try {
      return await this.tweetModel.findById(tweetId );
    } catch {
      throw new NotFoundException('is it the right id?');
    }
  }
  async GetByUserId(userId: string): Promise<Tweet[]> {
    try {
      return await this.tweetModel
        .find({ from: userId })
    } catch {
      throw new NotFoundException('is it the right id?');
    }
  }
  async GetTop30Tweets(): Promise<Tweet[]> {
    return await this.tweetModel
      .aggregate([
        {
          $set: {
            likesSize: { $size: '$likes' },
            commentsSize: { $size: '$comments' },
          },
          $sort: {
            likesSize: -1,
            commentsSize: -1,
          },
          $project: {
            likesSize: 0,
            commentsSize: 0,
          },
        },
      ])
      .limit(30);
  }
  async AddRetweetNumber(tweetId: string) {
    try {
      let tweet = await this.tweetModel.findById(tweetId);
      tweet.retweetsNumber += 1;
      return await tweet.save();
    } catch {
      throw new BadRequestException();
    }
  }
  async Publish(createTweet: CreateTweetDto): Promise<Tweet> {
    let createdTweet = new this.tweetModel(createTweet);
    try {
      await createdTweet.save();
      return;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Your Tweet shouldn´t be empty');
      }
      throw error;
    }
  }
  async AddOrRemoveLike(tweetId: string, id: string) {
    try {
      let tweet = await this.tweetModel.findById(tweetId );
      let whoReacted = await this.userService.findById(id);
      if (!tweet || !whoReacted) {
        return new NotFoundException();
      }
      // if the interaction wasn't previoulsy triggered by the user
      if (!tweet.likes.includes(whoReacted.id)) {
        // stored the interaction in db
        tweet.likes.push(whoReacted.id);
      } else {
        // the interaction was stored so we remove
        let likeIndex = tweet.likes.indexOf(whoReacted.id);
        tweet.likes.splice(likeIndex, 1);
      }
      return await tweet.save();
    } catch {
      throw new BadRequestException();
    }
  }
}
