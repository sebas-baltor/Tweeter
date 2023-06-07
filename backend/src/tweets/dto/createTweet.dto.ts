import { IsNotEmpty,IsBooleanString} from "class-validator";
import { Tweet } from "../schema/tweet.schema";
import { ApiProperty } from "@nestjs/swagger";
export class CreateTweetDto {
    @ApiProperty({required:true,type:"ObjectId or string",description:"identify the current user"})
    @IsNotEmpty()
    from:string;
    @ApiProperty({required:true,default:"true",type:"boolean string",example:"true",description:"represent the tweet's visivility true=everyone, false=just followers"})
    @IsBooleanString()
    visibility:boolean;
    @ApiProperty({required:false,type:"string",description:"the tweet content it could be empty",})
    content:string;
    publishDate:Date;
    imgPath:string;
    @ApiProperty({required:true,default:"false",type:"boolean string",example:"false",description:"represent if the tweet is a retweet"})
    @IsBooleanString()
    isRetweet:boolean;
    @ApiProperty({required:false,type:"ObjectId or string",description:"by default is not required but if this tweet is a retweet you should include"})
    originalTweetId:string;
    originalTweet:Tweet;
    @ApiProperty({required:false,type:"string[binary]",description:"represent an image if you want to illustrate your tweet"})
    figure:[Object];
}