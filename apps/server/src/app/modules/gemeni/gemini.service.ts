import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { generateWordPrompt } from "./prompt";

@Injectable()
export class GeminiService {
    private readonly geminiModel: GenerativeModel;
    private readonly logger = new Logger(GeminiService.name);

    constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      this.logger.error(
        'GEMINI_API_KEY is not configured. Please check your .env file'
      );
      throw new Error('GEMINI_API_KEY is not configured');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    this.geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    }

    async generateWordDetail(word: string): Promise<any> {
        const prompt = generateWordPrompt + word;
        try {
    //   this.logger.log(`Send prompt tới Gemini: ${prompt}`);
      const result = await this.geminiModel.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      try {
        // Gemini có thể trả về thêm ký tự hoặc không phải JSON thuần túy,
        // cần xử lý để chỉ lấy phần JSON.
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch && jsonMatch[0]) {
          return JSON.parse(jsonMatch[0]);
        } else {
          this.logger.warn('No valid JSON found in Gemini response');
           throw new Error('No valid JSON found in Gemini response');
        }
      } catch (jsonError) {
        this.logger.error(
          `JSON Parsing Error: ${jsonError}. Original response: ${text}`
        );
        throw new Error('Error in AI response format. Please try again.');
      }
    } catch (error) {
      this.logger.error('Error calling Gemini API:', error);
      throw new Error('Unable to process request with AI.');
    }
  }
}