import {
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
      return await this.userModel.findById({ _id: id });
    } catch (error) {
      throw new NotFoundException('Wrong id');
    }
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne(
      { email: email },
      'name bio phone email password avatarPath backgroundPath tweets friends savedTweets retweets',
    );
  }
  async followPeople({ id, followId }: FollowRequest): Promise<string> {
    const user = await this.userModel.findById(id);
    const follow = await this.userModel.findById(followId);

    console.log({ user, follow });
    // I´m following a user, but I dont want anymore
    if (user.following.includes(follow)) {
      let followIndex = user.following.indexOf(follow);
      user.following.splice(followIndex, 1);
      user.save();
      follow.save();
      return 'unfollow';
    }
    user.following.push(follow);
    follow.follows.push(user);
    user.save();
    follow.save();
    return 'follow';
  }
}
