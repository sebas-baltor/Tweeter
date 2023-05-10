import {Prop,Schema, SchemaFactory}from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";
import { Tweet } from "../../tweets/schema/tweet.schema";

export type HashtagDocument = HydratedDocument<Hashtag>
@Schema()
export class Hashtag {
    @Prop({required:true})
    hastag:string;

    @Prop({type:[{type:SchemaTypes.ObjectId,ref:"Tweet"}]})
    tweetsWithIt:Tweet[];
}
export const HashtagSchema = SchemaFactory.createForClass(Hashtag);