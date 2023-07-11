import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comments.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comment.schema';
import { Model, ObjectId } from 'mongoose';
import { TweetsService } from 'src/tweets/tweets.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private tweetService: TweetsService,
    private userService:UsersService
  ) {}
  async createComment(
    tweetId: string,
    createComment: CreateCommentDto,
    userId: string,
  ): Promise<Comment> {
    // if the user has access to this tweet we append the reference
    let tweet = await this.tweetService.GetOneById(tweetId, userId);
    let user = await this.userService.findById(userId);
    // create the comment
    let comment = new this.commentModel(createComment);
    comment.tweet = tweet;
    comment.publishDate = new Date();
    comment.user = user;

    try {
      return await comment.save();
    } catch (error) {
      throw new BadGatewayException('something went wrong try in a while');
    }
  }
  async repliedComment(
    commentToRepliedId: string,
    commentId: string,
  ): Promise<Comment> {
    try {
      let update = await this.commentModel.findOneAndUpdate(
        {
          _id: commentToRepliedId,
          replies: { $nin: [commentId] },
        },
        { $push: { replies: commentId } },
      );
      return update;
    } catch {
      throw new BadGatewayException('something went wrong, no reply aplied');
    }
  }
  async GetAllByIdAndNoReply(
    tweetId: ObjectId,
    exclude: string[] = [],
  ): Promise<Comment[]> {
    try {
      return await this.commentModel
        .find({
          tweet: tweetId,
          isReplied: 0,
          _id: { $nin:exclude },
        }).sort({publishDate:-1})
        .limit(20);
    } catch {
      throw new BadRequestException('verify the id');
    }
  }
}
