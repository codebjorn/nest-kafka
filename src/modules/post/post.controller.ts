import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post as PostData } from './post.schema';
import { PostService } from './post.service';

type ReturnType = {
  data?: PostData | PostData[];
  message?: 'success' | 'error';
};

@Controller('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get()
  async getAll(): Promise<ReturnType> {
    return { data: await this.service.getAll() };
  }

  @Get(':_id')
  async get(@Param('_id') _id: string): Promise<ReturnType> {
    return { data: await this.service.get(_id) };
  }

  @Post()
  create(@Body() data: CreatePostDto): ReturnType {
    this.service.create(data);
    return { message: 'success' };
  }

  @Put(':_id')
  update(@Param('_id') _id: string, @Body() data: UpdatePostDto): ReturnType {
    this.service.update({ _id, ...data });
    return { message: 'success' };
  }

  @Delete(':_id')
  delete(@Param('_id') _id: string): ReturnType {
    this.service.delete(_id);
    return { message: 'success' };
  }
}
