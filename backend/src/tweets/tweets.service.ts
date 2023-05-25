import {
  ConflictException,
  Injectable,
  Optional,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Tweet } from './schema/tweet.schema';
import { CreateTweetDto } from './dto/createTweet.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import * as fs from 'fs';
import InteractionDto, { TweetInteractionsString } from './dto/interaction.dto';

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
  async Interaction({ tweetId, who, interaction }: InteractionDto) {
    try {
      let tweet = await this.tweetModel.findById({ _id: tweetId });
      let whoReacted = await this.userService.findById(who);
      if (!tweet || !whoReacted) {
        return new NotFoundException();
      }
      // if the interaction wasn't previoulsy triggered by the user
      if (!tweet[interaction].includes(whoReacted.id)) {
        // stored the interaction in db
        tweet[interaction].push(whoReacted.id);
      } else {
        // the interaction was stored so we remove
        let interactionIndex = tweet[interaction].indexOf(whoReacted.id);
        tweet[interaction].splice(interactionIndex, 1);
      }
      return await tweet.save();
    } catch {
      throw new BadRequestException();
    }
  }
}
