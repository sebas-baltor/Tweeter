import { Tweet } from "./tweet";

export type User = {
    _id:string;
    name:string;
    bio:string;
    avatarPath:string;
    backgroundPath:string;
    follows:Array<User>;
    savedTweets:Array<Tweet>;
    following:Array<User>;  
}