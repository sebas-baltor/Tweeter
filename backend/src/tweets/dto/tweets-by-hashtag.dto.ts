import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TweetByHastag{
    @ApiProperty({type:"string",required:true,description:"represent the hashtags you are looking for"})
    @IsNotEmpty()
    hashtag:string;
    @ApiProperty({type:"array",required:false,description:"represent all the tweets id with this hashtag but won't be included in the response",example:'["64aca3361592c5da8d026843","64aca3361592c5da8d026833",...]'})
    exclude:string[]=[]
}