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
      return await this.tweetModel.findById(tweetId);
    } catch {
      throw new NotFoundException('is it the right id?');
    }
  }
  async GetByUserId(userId: string): Promise<Tweet[]> {
    try {
      return await this.tweetModel.find({ from: userId });
    } catch {
      throw new NotFoundException('is it the right id?');
    }
  }
  async GetTop30Tweets(): Promise<Tweet[]> {
    return await this.tweetModel
    .aggregate([
      {$match:{
        visibility:true,
        isRetweet:false
      }},
      { $project: {
        _id: 1,
        from:1,
        publishDate:1,
        content:1,
        visibility:1,
        imgPath:1,
        commentsCount: { $size: "$comments" },
        likesCount: { $size: "$likes" },
      }},
      { $sort: {
        commentsCount: -1,
        likesCount: -1,
      }},
      { $limit: 30 },
    ])

      
  }
  async AddRetweetNumber(tweetId: string) {
    try {
      return await this.tweetModel.updateOne({_id:tweetId},{$inc:{retweetsNumber:1}});
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
      let res = await this.tweetModel.updateOne({_id:tweetId,likes:{$in:[id]}},{
        $pull:{likes:id}
      })
      if(res.modifiedCount === 0){
        return await this.tweetModel.updateOne({_id:tweetId},{$push:{likes:id}})
      }
      return res;
    } catch {
      throw new BadRequestException();
    }
  }
}
