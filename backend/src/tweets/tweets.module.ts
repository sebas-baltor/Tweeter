import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports:[
        MulterModule.register({
            storage: diskStorage({
              destination: './upload/tweets',
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
          }),UsersService
    ],
    controllers:[TweetsController],
    providers:[TweetsService]
})
export class TweetsModule {}