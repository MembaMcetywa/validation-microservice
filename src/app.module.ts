import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ValidationClientService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ValidationClientService],
})
export class AppModule {}
