import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneNumber, PhoneNumberSchema } from './phone-number-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhoneNumber.name, schema: PhoneNumberSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class PhoneNumberModule {}
