import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { FilesController } from './files/files.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017/tweeter"), UsersModule, AuthModule],
  controllers: [AppController, FilesController],
  providers: [AppService],
})
export class AppModule {}
