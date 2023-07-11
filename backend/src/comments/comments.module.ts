import { Module, forwardRef } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comment.schema';
import { TweetsModule } from 'src/tweets/tweets.module';
import { UsersModule } from 'src/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Comment.name,schema:CommentSchema}]),
        
        MulterModule.register({
            storage: diskStorage({
              destination: './upload/comments',
              filename: (req, file, cb) => {
                const randomName = Array(32)
                  .fill(null)
                  .map(() => Math.round(Math.random() * 16).toString(16))
                  .join('');
                const extension = extname(file.originalname);
                cb(null, `${randomName}${extension}`);
              },
            }),
            fileFilter: (req, file, cb) => {
              const allowedExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
              const extension = extname(file.originalname).toLowerCase();
              if (allowedExtensions.includes(extension)) {
                cb(null, true);
              }
            },
          }),
          UsersModule,
          // circular depend with tweet
        forwardRef(()=>TweetsModule),

    ],
    controllers:[CommentsController],
    providers:[CommentsService],
    exports:[CommentsService]
})
export class CommentsModule {}
