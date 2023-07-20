import { Tweet } from "../types/tweet";
import { User } from "../types/user";

export interface IInitialState {
    token:string|undefined;
    profile:User;
    recentTweets:Array<Tweet>;
    topUsers:Array<User>;
    topHashtags:Array<string>;
}
