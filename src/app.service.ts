import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PhoneNumber, PhoneNumberDocument } from './phone-number-schema';
import { PhoneNumberDTO } from './phone-number-dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(PhoneNumber.name)
    private readonly phoneNumberModel: Model<PhoneNumberDocument>,
  ) {}

  async savePhoneNumber(phoneData: PhoneNumberDTO): Promise<PhoneNumber> {
    const newPhoneNumber = new this.phoneNumberModel(phoneData);
    return await newPhoneNumber.save();
  }
  getHello(): string {
    return 'Hello, World!';
  }
}
