import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { parsePhoneNumber } from 'libphonenumber-js';
import { AppService } from './app.service';
import { PhoneNumberDTO } from '../src/phone-number-dto';

// constructor(private readonly phoneNumberService: PhoneNumberService) {}
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'validate-phone-number' })
  @Post('validate-phone-number')
  async validatePhoneNumbers(@Body() body: { phoneNumbers: string[] }) {
    const { phoneNumbers } = body;
    const validationResults = [];
    const savedPhoneNumbers = [];
    for (const phoneNumber of phoneNumbers) {
      try {
        const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
        if (parsedPhoneNumber) {
          const extractedPhoneNumber = parsedPhoneNumber.number;
          const phoneNumberCountryCode = parsedPhoneNumber.country;
          const phoneNumberType = parsedPhoneNumber.getType();
          const isValid = parsedPhoneNumber.isValid();
          const isPhoneNumberPossible = parsedPhoneNumber.isPossible();

          const phoneData: PhoneNumberDTO = {
            phoneNumber: extractedPhoneNumber,
            phoneNumberCountryCode: phoneNumberCountryCode,
            phoneNumberType: phoneNumberType,
            phoneNumberIsValid: isValid,
            phoneNumberIsPossible: isPhoneNumberPossible,
          };

          const savedPhoneNumber =
            await this.appService.savePhoneNumber(phoneData);

          savedPhoneNumbers.push(savedPhoneNumber);
        } else {
          savedPhoneNumbers.push({
            phoneNumber,
            error: 'Invalid phone number format',
          });
        }
      } catch (error) {
        savedPhoneNumbers.push({
          phoneNumber,
          error: 'Invalid phone number format',
        });
      }
    }
    return validationResults && savedPhoneNumbers;
  }
}
