import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comments.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
    constructor(private commentService:CommentsService){}

    @Post()
    async GetAll(@Param("tweetId") tweetId , @Body() createCommentDto:CreateCommentDto){
        return await this.commentService.createComment(tweetId,createCommentDto);
    }
}
