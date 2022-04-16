import { Injectable, Logger } from '@nestjs/common';

type LogPosts = {
  status: string;
  post: string;
};

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  logPosts({ status, post }: LogPosts) {
    this.logger.log(`A post was ${status}, with data ${post}`);
  }
}
