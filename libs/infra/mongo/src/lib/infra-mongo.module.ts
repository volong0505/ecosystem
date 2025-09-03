import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export class InfraMongoModule {
  static forRoot(uri: string): DynamicModule {
    return {
      module: InfraMongoModule,
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri,
          }),
        }),
      ],
    };
  }
}