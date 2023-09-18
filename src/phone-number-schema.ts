import * as mongoose from 'mongoose';

export type PhoneNumberDocument = PhoneNumber & mongoose.Document;

export class PhoneNumber {
  phoneNumber: string;
  phoneNumberCountryCode: string;
  phoneNumberType: string;
  phoneNumberIsValid: boolean;
  phoneNumberIsPossible: boolean;
}

export const PhoneNumberSchema = new mongoose.Schema<PhoneNumber>({
  phoneNumber: String,
  phoneNumberCountryCode: String,
  phoneNumberType: String,
  phoneNumberIsValid: Boolean,
  phoneNumberIsPossible: Boolean,
});

export const PhoneNumberModel = mongoose.model<PhoneNumberDocument>(
  'PhoneNumber',
  PhoneNumberSchema,
);
