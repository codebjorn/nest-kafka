import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { DictionaryConfig, ClientConfig } from 'src/config';
import { CreatePostDto } from './dto';
import { PostController } from './post.controller';
import { Post, PostSchema } from './post.schema';
import { PostService } from './post.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ClientsModule.registerAsync([
      {
        name: DictionaryConfig.KafkaName,
        useClass: ClientConfig,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PostController],
  providers: [CreatePostDto, PostService],
  exports: [PostService],
})
export class PostModule {}
