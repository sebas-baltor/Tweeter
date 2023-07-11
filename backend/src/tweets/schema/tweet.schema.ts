import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from '../../users/schema/user.schema';
import { Comment } from '../../comments/schema/comment.schema';

export type TweetDocument = HydratedDocument<Tweet>;
@Schema()
export class Tweet {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  from: User;

  @Prop({ required: true })
  publishDate: Date;
  
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  visibility: number;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
  likes: User[];

  @Prop()
  imgPath: string;

  @Prop({required:true})
  isRetweet:number;

  @Prop({required:false,type:SchemaTypes.ObjectId,ref:"Tweet"})
  originalTweet:Tweet;

  @Prop()
  retweetsNumber: number;
}
export const TweetSchema = SchemaFactory.createForClass(Tweet);