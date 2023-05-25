import { Controller,Get,Post,UseGuards,Request, Body, UseInterceptors, UploadedFile, HttpCode,HttpStatus } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/createTweet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import InteractionDto from './dto/interaction.dto';

@Controller('tweets')
export class TweetsController {
    constructor(private tweetService:TweetsService){}
    // the top tweets of the top people
    @Get("top")
    GetTopTweets(@Request() req){
        return "top";
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
    async PublishTweet(@Body() createTweetDto:CreateTweetDto,@UploadedFile() figure?:Express.Multer.File){
        createTweetDto.publishDate = new Date();
        // set the path of this resourse
        if(figure){
            createTweetDto.imgPath=`/files/tweet-figure/${figure.filename}`
        }
        return await this.tweetService.Publish(createTweetDto);

    }
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(AuthGuard)
    @Post("interaction")
    async TweeterInteraction(@Body() interactionDto:InteractionDto){
        await this.tweetService.Interaction(interactionDto);
    }
}
