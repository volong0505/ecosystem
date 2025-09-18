import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordModule } from './modules';
import { InfraMongoModule } from '@ecosystem/infra-mongo';
import { ConfigModule } from '@nestjs/config';
import { FlashcardModule } from './modules/flashcard/flashcard.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    InfraMongoModule.forRoot(process.env.MONGO_URI as string),

    WordModule,
    FlashcardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
