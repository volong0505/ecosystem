import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordModule } from './modules';
import { InfraMongoModule } from '@ecosystem/infra-mongo';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    InfraMongoModule.forRoot(process.env.MONGO_URI as string),

    WordModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
