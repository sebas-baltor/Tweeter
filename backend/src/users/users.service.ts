import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { FollowRequest } from './dto/friend-req.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // encripting password
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    // equivalent to new User or new Model
    const createdUser = new this.userModel(createUserDto);
    try {
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email or Phone number already exists');
      }
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findById(id, { password: 0, email: 0 });
    } catch (error) {
      throw new NotFoundException('Wrong id');
    }
  }
  async findByIdWhereFollower(id:string,followerId:string):Promise<User>{
    return await this.userModel.findOne({_id:id,follows:{$in:[followerId]}});
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne(
      { email: email },
      'name bio phone email password avatarPath backgroundPath tweets friends savedTweets retweets',
    );
  }
  async followPeople({ id, followId }: FollowRequest): Promise<string> {
    try {
      // if I follow a person I'm going to unfollow
      let myRes = await this.userModel.updateOne(
        { _id: id, following: { $in: [followId] } },
        {
          $pull: { following: followId },
        },
      );
      // if the person I follow has my follow,cremove it
      let followRes = await this.userModel.updateOne(
        { _id: followId, follows: { $in: [id] } },
        { $pull: { follows: id } },
      );
      // else I didn't follow the person and want to follow him
      if (myRes.modifiedCount === 0) {
        myRes = await this.userModel.updateOne(
          { _id: id },
          { $push: { following: followId } },
        );
      }
      // append my follow to the follower of the person I want to follow
      if (followRes.modifiedCount === 0) {
        followRes = await this.userModel.updateOne(
          { _id: followId },
          { $push: { follows: id } },
        );
      }
      return;
    } catch {
      throw new BadRequestException();
    }
  }
  async saveTweet(tweetId: string, id: string) {
    // if I saved the tweet before, I remove it
    let res = await this.userModel.updateOne(
      { _id: id, savedTweets: { $in: [tweetId] } },
      { $pull: { savedTweets: tweetId } },
    );
    // else the tweet wasn't saved so I save
    if(res.modifiedCount ===0){
      return await this.userModel.updateOne(
        {_id:id},{$push:{savedTweets:tweetId}}
      )
    }
  }
}
