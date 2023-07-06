import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument,SchemaTypes } from "mongoose";
import { Tweet } from "../../tweets/schema/tweet.schema";

export type CommentDocument = HydratedDocument<Comment>;
@Schema()
export class Comment{
    @Prop({required:true})
    comment:string;

    @Prop({required:true,type:SchemaTypes.ObjectId,ref:"Tweet"})
    tweet:Tweet;

    @Prop({required:true})
    publishDate:Date;

    @Prop()
    commentImgPath:string
    

    @Prop({type:[{type:SchemaTypes.ObjectId,ref:"Comment"}]})
    replies:Comment[];
}
export const CommentSchema = SchemaFactory.createForClass(Comment);