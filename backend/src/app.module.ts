import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { FilesController } from './files/files.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TweetsModule } from './tweets/tweets.module';
import { CommentsModule } from './comments/comments.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tweeter'),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    TweetsModule,
    CommentsModule,
  ],
  controllers: [AppController, FilesController],
  providers: [AppService],
})
export class AppModule {}
