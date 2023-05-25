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
  visibility: boolean;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
  likes: User[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
  saved: User[];

  @Prop()
  imgPath: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }] })
  retweetBy: User[];
}
export const TweetSchema = SchemaFactory.createForClass(Tweet);
