import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CommonModule } from './common';
import { MongooseConfig } from './config';
import { NotificationModule } from './modules/notification';
import { PostModule } from './modules/post';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfig,
      inject: [ConfigService],
    }),
    CommonModule,
    PostModule,
    NotificationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
