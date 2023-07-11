import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument,SchemaTypes } from "mongoose";
import { Tweet } from "../../tweets/schema/tweet.schema";
import { User } from "src/users/schema/user.schema";

export type CommentDocument = HydratedDocument<Comment>;
@Schema()
export class Comment{
    _id:string;
    @Prop({required:true})
    comment:string;

    @Prop({required:true,type:SchemaTypes.ObjectId,ref:"Tweet"})
    tweet:Tweet;

    @Prop({required:true})
    publishDate:Date;

    @Prop()
    figurePath:string

    @Prop({required:true})
    isReplied:number;
    
    @Prop({type:[{type:SchemaTypes.ObjectId,ref:"Comment"}]})
    replies:Comment[];
    
    @Prop({required:true,type:SchemaTypes.ObjectId,ref:"Users"})
    user:User;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);