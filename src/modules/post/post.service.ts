import { Model } from 'mongoose';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Post, PostDocument } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PersistentPostData, PostData } from './interface';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PostService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectModel(Post.name) private model: Model<PostDocument>,
    @Inject('Kafka') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async getAll(): Promise<Post[]> {
    return this.model.find({}, { __v: 0 });
  }

  async get(_id: string): Promise<Post> {
    return this.model.findOne({ _id }, { __v: 0 });
  }

  async create({ title, description, body }: PostData) {
    const newPost = await this.model.create({ title, description, body });

    this.client.emit('posts', { key: 'created', value: newPost });
  }

  async update({ _id, title, description, body }: PersistentPostData) {
    await this.model.updateOne({ _id }, { title, description, body });
    const updatedPost = await this.get(_id);

    this.client.emit('posts', { key: 'updated', value: updatedPost });
  }

  async delete(_id: string) {
    const deletedPost = await this.get(_id);
    await this.model.deleteOne({ _id });

    this.client.emit('posts', { key: 'deleted', value: deletedPost });
  }

  async exists({
    field,
    value,
  }: {
    field: string;
    value: string;
  }): Promise<boolean> {
    return !!(await this.model.exists({ [field]: value }));
  }
}
