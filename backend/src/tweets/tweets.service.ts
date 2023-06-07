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
import InteractionDto, { TweetInteractionsString } from './dto/interaction.dto';
@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<Tweet>,
    private userService: UsersService,
  ) {}
  async GetById(tweetId:string):Promise<Tweet>{
    try{
      return await this.tweetModel.findById({_id:tweetId});
    }catch{
      throw new NotFoundException("is it the right id?")
    }
  }
  async GetByUserId(userId:string):Promise<Tweet[]>{
    try{
      return await this.tweetModel.find({from:userId}).populate("");
    }catch{
      throw new NotFoundException("is it the right id?")
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
