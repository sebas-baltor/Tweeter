import { Controller,Get,Post,UseGuards,Request, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/createTweet.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tweets')
export class TweetsController {
    constructor(private tweetService:TweetsService){}
    // the top tweets of the top people
    @Get("top")
    async GetTopTweets(@Request() req){
    }
    // all tweets of a single user
    @UseGuards(AuthGuard)
    @Get("all")
    async GetAllUserTweets(){

    }
    // publish a tweet
    @UseGuards(AuthGuard)
    @Post("publish")
    @UseInterceptors(FileInterceptor("figure"))
    async PublishTweet(@Body() createTweetDto:CreateTweetDto,@UploadedFile() figure:Express.Multer.File){
        console.log(figure);
        // set the path of this resourse
        if(figure.filename){
            createTweetDto.tweetImgPath=`/files/tweet-figure/${figure.fieldname}`
        }
        return await this.tweetService.Publish(createTweetDto);
    }
}
