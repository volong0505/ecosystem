import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseResponse } from '../base-response';
import { WordDto } from './word.dto';

class DefinitionDto {
  @IsString()
  @IsNotEmpty()
  translation!: string;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsString()
  example?: string;

  @IsOptional()
  @IsString()
  exampleVi?: string;
}

export class UpsertWordRequest {

  @IsString()
  _id!: string | null;

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
  @IsNotEmpty()
  ipa?: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  partOfSpeech!: string;

  @IsString()
  usageNote!: string;
 
  definitions!: DefinitionDto[];
}

export class UpsertWordResponse extends BaseResponse<WordDto> {
}