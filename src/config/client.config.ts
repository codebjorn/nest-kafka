import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientConfig implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createClientOptions(): ClientProvider | Promise<ClientProvider> {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.configService.get('KAFKA_CLIENT_ID'),
          brokers: [this.configService.get('KAFKA_BROKER')],
        },
        consumer: {
          groupId: this.configService.get('KAFKA_CONSUMER_GROUP_ID'),
        },
      },
    };
  }
}
