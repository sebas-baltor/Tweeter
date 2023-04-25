import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

import { MessageMiddleware } from 'src/middleware/message.middleware';

@Module({
    controllers:[CatsController],
    providers:[CatsService]
})
export class CatsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MessageMiddleware).forRoutes("cats")
    }
}
