import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private service: NotificationService) {}

  @MessagePattern('posts')
  readMessage(@Payload() message: { key: string; value: string }) {
    const { key: status, value: post } = message;
    this.service.logPosts({ status, post });
  }
}
