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
    private userService:UsersService
  ) {}
  async GetOneById(tweetId: string,followerId:string): Promise<Tweet> {
    try {
      let tweet = await this.tweetModel.findById(tweetId);
      // if the user has like follower the next person
      let userHasFollower = await this.userService.findByIdWhereFollower(tweet.from.toString(),followerId);
      // if who want this resourse is the same individal of wrote the tweet
      if(tweet.from.toString() == followerId){
        return tweet;
      }
      // the tweets has set the visivility field with 0
      // is only for the people who follow them
      if(userHasFollower != null && tweet.visibility == 0){
        return tweet;
      }
      // if the visivility is for everyone
      if(tweet.visibility == 1){
        return tweet;
      }
      // else this user has no access to this tweet
    } catch {
      throw new NotFoundException('is it the right id? or you do not have access to this resource');
    }
  }
  async GetAllByUserId(userId: string,followerId:string): Promise<Tweet[]> {
    try {
      let allTweetsForEveryone = await this.tweetModel.find({from:userId,visibility:1});
      let allTweetsForFollowers = await this.tweetModel.find({from:userId})
      // if this varable is null, meant the user who pretend to see, is not a follower
      // he hasn't access to these tweets
      let user = await this.userService.findByIdWhereFollower(userId,followerId);
      // if the user is full means the person who ask for the tweets is my follower
      // also if the same people who ask for the tweets is my self of corse has 
      // access to all my tweets
      if(user != null || userId == followerId){
        return allTweetsForFollowers
      }
      // alse he just have access to the tweets for everyone
      return allTweetsForEveryone
    } catch {
      throw new NotFoundException('is it the right id?');
    }
  }
  async GetTop30Tweets(): Promise<Tweet[]> {
    return await this.tweetModel.aggregate([
      {
        $match: {
          visibility: 1,
          isRetweet: 0,
        },
      },
      {
        $set: {
          commentsCount: { $size: '$comments' },
          likesCount: { $size: '$likes' },
        },
      },
      {
        $project: {
          _id: 1,
          from: 1,
          publishDate: 1,
          content: 1,
          visibility: 1,
          imgPath: 1,
        },
      },
      {
        $sort: {
          commentsCount: -1,
          likesCount: -1,
        },
      },
      { $limit: 30 },
    ]);
    
  }
  async AddRetweetNumber(tweetId: string) {
    try {
      return await this.tweetModel.updateOne(
        { _id: tweetId },
        { $inc: { retweetsNumber: 1 } },
      );
    } catch {
      throw new BadRequestException();
    }
  }
  async Publish(createTweet: CreateTweetDto, userId: string): Promise<Tweet> {
    createTweet.from = userId;
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
      let res = await this.tweetModel.updateOne(
        { _id: tweetId, likes: { $in: [id] } },
        {
          $pull: { likes: id },
        },
      );
      if (res.modifiedCount === 0) {
        return await this.tweetModel.updateOne(
          { _id: tweetId },
          { $push: { likes: id } },
        );
      }
      return res;
    } catch {
      throw new BadRequestException();
    }
  }
}
