// Import necessary modules and classes
import { Controller, Post, Body } from '@nestjs/common';
import { parsePhoneNumber } from 'libphonenumber-js';

// Define a controller to handle the validation
@Controller('api')
export class AppController {
  @Post('validate-phone-number')
  async validatePhoneNumbers(@Body() body: { phoneNumbers: string[] }) {
    const { phoneNumbers } = body;
    const validationResults = [];
    console.log('helloooo');
    for (const phoneNumber of phoneNumbers) {
      try {
        // Parse the phone number
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

          // Push the validation result, phone number type, and country code to the array
          validationResults.push({
            extractedPhoneNumber,
            isValid,
            phoneNumberType,
            isPhoneNumberPossible,
          });
        } else {
          // Handle cases where the phone number cannot be parsed
          validationResults.push({
            phoneNumber,
            error: 'Invalid phone number format',
          });
        }
      } catch (error) {
        // Handle any validation errors here
        validationResults.push({
          phoneNumber,
          error: 'Invalid phone number format',
        });
      }
    }

    // Return the array of validation results
    return validationResults;
  }
}
