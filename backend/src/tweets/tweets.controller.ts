import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/createTweet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import InteractionDto from './dto/interaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Tweet } from './schema/tweet.schema';
@ApiTags('tweets')
@ApiBearerAuth()
@Controller('tweets')
@UseGuards(AuthGuard)
export class TweetsController {
  constructor(private tweetService: TweetsService) {}
  // the top tweets of the top people
  @Get('top')
  GetTopTweets(@Request() req) {
    return 'top';
  }
  // all tweets of a single user
  @Get('/:userId/all')
  async GetAllUserTweets() {}
  // publish a tweet
  @Post('publish')
  @UseInterceptors(FileInterceptor('figure'))
  async PublishTweet(
    @Body() createTweetDto: CreateTweetDto,
    @UploadedFile() figure?: Express.Multer.File,
  ) {
    createTweetDto.publishDate = new Date();
    // set the path of this resourse
    if (figure) {
      createTweetDto.imgPath = `/files/tweet-figure/${figure.filename}`;
    }
    // if you are creating a retweet the origin tweet reference should bee empty
    if (
      createTweetDto.isRetweet === true &&
      (createTweetDto.originalTweetId === '' ||
        createTweetDto.originalTweetId === null)
    ) {
      return new BadRequestException(
        'a retweet must have the original tweet reference',
      );
    }
    //else find the original tweet and embedding
    if (createTweetDto.isRetweet) {
      let originalTweet = await this.tweetService.GetById(
        createTweetDto.originalTweetId,
      );
      createTweetDto.originalTweet = originalTweet;
    }
    return await this.tweetService.Publish(createTweetDto);
  }
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('interaction')
  async TweeterInteraction(@Body() interactionDto: InteractionDto) {
    await this.tweetService.Interaction(interactionDto);
  }
}
