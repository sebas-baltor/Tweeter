import { IsIn} from "class-validator";
import { Tweet } from "../schema/tweet.schema";
import { ApiProperty } from "@nestjs/swagger";
export class CreateTweetDto {
    from:string;
    @ApiProperty({required:true,type:"number",example:"0 or 1",description:"represent the tweet's visivility 1=true=everyone, 0=false=just followers"})
    @IsIn([0,1,"0","1"])
    visibility:number;
    @ApiProperty({required:false,type:"string",description:"the tweet content it could be empty",})
    content:string;
    publishDate:Date;
    imgPath:string;
    hashtags:string[];
    @ApiProperty({required:true,type:"number",example:"0 or 1",description:"represent if the tweet is a retweet 0=false, 1=true"})
    @IsIn([0,1,"0","1"])
    isRetweet:number;
    @ApiProperty({required:false,type:"ObjectId or string",description:"by default is not required but if this tweet is a retweet you should include"})
    originalTweetId:string;
    originalTweet:Tweet;
    @ApiProperty({required:false,type:"string[binary]",description:"represent an image if you want to illustrate your tweet"})
    figure:[Object];
}