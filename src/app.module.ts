import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneNumberModule } from './phone-number.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mongodb'),
    PhoneNumberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
