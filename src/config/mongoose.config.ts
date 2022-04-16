import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `mongodb://${this.configService.get(
        'DB_USERNAME',
      )}:${this.configService.get('DB_PASSWORD')}@${this.configService.get(
        'DB_HOST',
      )}:${this.configService.get('DB_PORT')}`,
      dbName: this.configService.get('DB_NAME'),
    };
  }
}
