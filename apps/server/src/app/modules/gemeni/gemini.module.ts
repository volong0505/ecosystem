import { Module } from "@nestjs/common";
import { GeminiService } from "./gemini.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
    ],
    providers: [
        GeminiService
    ],
    exports: [
        GeminiService
    ]
})
export class GeminiModule { }