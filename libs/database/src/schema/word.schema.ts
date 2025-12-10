import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WordDocument = Word & Document;

@Schema({ _id: false })
export class Definition {

  @Prop()
  translation!: string;

  @Prop()
  explanation?: string;

  @Prop()
  example!: string;

  @Prop()
  exampleVi!: string

  @Prop()
  note!: string;

}

const DefinitionSchema = SchemaFactory.createForClass(Definition);

@Schema({ timestamps: true })
export class Word {
  @Prop({ required: true })
  _id!: string

  @Prop({ required: true })
  languageCode!: string; // ISO code like 'en', 'jp'

  @Prop({ required: true })
  word!: string;

  @Prop()
  translation!: string;

  @Prop()
  ipa!: string

  @Prop()
  level!: string;

  @Prop()
  partOfSpeech!: string;

  @Prop()
  usageNote!: string;

  @Prop({ type: [DefinitionSchema], default: [] })
  definitions!: Definition[]

  @Prop()
  creationDate?: Date;

  @Prop()
  reviewedAt?: Date;

  // for flashcard
  @Prop()
  repetition!: number;

  @Prop()
  nextReviewDate!: Date;

}

export const WordSchema = SchemaFactory.createForClass(Word);