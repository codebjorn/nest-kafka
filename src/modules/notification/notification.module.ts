import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { DictionaryConfig, ClientConfig } from 'src/config';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: DictionaryConfig.KafkaName,
        useClass: ClientConfig,
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
