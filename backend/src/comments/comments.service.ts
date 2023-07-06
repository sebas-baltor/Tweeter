import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comment.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>
      ) {}
    async createComment(tweetId:string,createComment:CreateCommentDto):Promise<string>{
        return "hoal";
    }
}
