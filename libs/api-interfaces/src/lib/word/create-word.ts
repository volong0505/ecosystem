import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseResponse } from '../base-response';
import { WordDto } from './word.dto';

class ExampleDto {
  @IsString()
  @IsNotEmpty()
  sentence!: string;

  @IsOptional()
  @IsString()
  pronunciation?: string;

  @IsOptional()
  @IsString()
  meaning?: string;
}

export class CreateWordRequest {
  @IsString()
  @IsNotEmpty()
  languageCode!: string;

  @IsString()
  @IsNotEmpty()
  word!: string;

  @IsString()
  translation?: string;

  @IsOptional()
  @IsString()
  pronunciation?: string;

  @IsOptional()
  @IsString()
  meaning?: string;

  @IsOptional()
  @IsString()
  ipa?: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  partsOfSpeech?: string[];

  @IsOptional()
  @IsString()
  category?: string;

 
  examples!: ExampleDto[];
}

export class CreateWordResponse extends BaseResponse<WordDto> {
}