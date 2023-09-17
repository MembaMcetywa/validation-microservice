import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { parsePhoneNumber } from 'libphonenumber-js';

@Controller('api')
export class AppController {
  @MessagePattern({ cmd: 'validate-phone-number' })
  @Post('validate-phone-number')
  async validatePhoneNumbers(@Body() body: { phoneNumbers: string[] }) {
    const { phoneNumbers } = body;
    const validationResults = [];
    for (const phoneNumber of phoneNumbers) {
      try {
        const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
        if (parsedPhoneNumber) {
          const isValid = parsedPhoneNumber.isValid();
          console.log('is valid::', isValid);
          const isPhoneNumberPossible = parsedPhoneNumber.isPossible();
          console.log('is it possible', isPhoneNumberPossible);
          const phoneNumberType = parsedPhoneNumber.getType();
          console.log(phoneNumberType);
          const extractedPhoneNumber = parsedPhoneNumber.number;
          console.log(extractedPhoneNumber);
          const phoneNumberCountryCode = parsedPhoneNumber.country;
          console.log(phoneNumberCountryCode);

          validationResults.push({
            extractedPhoneNumber,
            isValid,
            phoneNumberType,
            isPhoneNumberPossible,
          });
        } else {
          validationResults.push({
            phoneNumber,
            error: 'Invalid phone number format',
          });
        }
      } catch (error) {
        validationResults.push({
          phoneNumber,
          error: 'Invalid phone number format',
        });
      }
    }
    return validationResults;
  }
}
