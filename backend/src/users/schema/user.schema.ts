import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";
import { Tweet } from "../../tweets/schema/tweet.schema";

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
    @Prop({required:true})
    name:string;

    @Prop({required:true})
    bio:string;

    @Prop({required:true,unique:true})
    phone:string;

    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({required:true})
    avatarPath:string;

    @Prop({required:true})
    backgroundPath:string;

    @Prop({type:[{type:SchemaTypes.ObjectId,ref:"Tweet"}]})
    tweets:Tweet[];

    @Prop({type:[{type:SchemaTypes.ObjectId,ref:"User"}]})
    follows:User[];

    @Prop({type:[{type:SchemaTypes.ObjectId,ref:"Tweet"}]})
    savedTweets:Tweet[];

    @Prop({type:[{type:SchemaTypes.ObjectId,ref:"Tweet"}]})
    retweets:Tweet[];

    @Prop({type:[{type:SchemaTypes.ObjectId,ref:"User"}]})
    following:User[];
}
export const UserSchema = SchemaFactory.createForClass(User);