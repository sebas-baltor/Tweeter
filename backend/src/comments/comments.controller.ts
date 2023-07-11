import {
  BadRequestException,
  Body,
  Controller,
  Request,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comments.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post('publish/:tweetId')
  @UseInterceptors(FileInterceptor('figure'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'tweetId',
    type: 'ObjectId or string',
    description: 'identify a every single tweet',
    example: '6487780f26de54c26edf9344',
  })
  async PublishComment(
    @Request() req,
    @Param('tweetId') tweetId,
    @Body() createCommentDto: CreateCommentDto,
    @UploadedFile() figure?: Express.Multer.File,
  ) {
    createCommentDto.isReplied = parseInt(
      createCommentDto.isReplied.toString(),
    );
    if (
      createCommentDto.isReplied == 1 &&
      (createCommentDto.replyTo === '' ||
        createCommentDto.replyTo === null ||
        createCommentDto.replyTo === undefined)
    ) {
      return new BadRequestException(
        'if you are answare to another user please pass the reference',
      );
    }
    // if the tweet has an illustration, this is the uri to access to this resourse
    if (figure) {
      createCommentDto.figurePath = `/files/comment-figure/${figure.filename}`;
    }

    let res = await this.commentService.createComment(tweetId, createCommentDto,req.user.id);
    if(createCommentDto.isReplied == 1){
        await this.commentService.repliedComment(createCommentDto.replyTo,res._id)
    }
    return res;
  }
}
