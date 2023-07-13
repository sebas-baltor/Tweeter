import { Tweet } from "../types/tweet";
import { User } from "../types/user";

export interface IInitialState {
    token:string;
    profile:User | null;
    recentTweets:Array<Tweet> | null;
    topUsers:Array<User>|null;
    topHashtags:Array<string> | null;
}
