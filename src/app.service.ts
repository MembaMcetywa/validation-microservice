// validation-client.service.ts
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ValidationClientService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 9001, // Port of the validation microservice
      },
    });
  }

  async validatePhoneNumber(phoneNumbers: string[]) {
    // Send a validation request to the validation microservice
    const client = this.client.send<string[], string[]>(
      'validate-phone',
      phoneNumbers,
    );
    return lastValueFrom(client);
  }
}
