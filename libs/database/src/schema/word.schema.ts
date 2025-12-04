import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WordDocument = Word & Document;

@Schema({ _id: false })
export class Example {

  @Prop({ required: true })
  sentence!: string;

  @Prop()
  pronunciation?: string;

  @Prop()
  meaning!: string;
}

const ExampleSchema = SchemaFactory.createForClass(Example);

@Schema({ timestamps: true })
export class Word {
  @Prop({ required: true })
  _id!: Types.ObjectId;

  @Prop({ required: true })
  languageCode!: string; // ISO code like 'en', 'jp'

  @Prop({ required: true })
  word!: string;

  @Prop({ required: true })
  translation!: string;

  @Prop()
  meaning!: string;

  @Prop()
  ipa!: string

  @Prop()
  pronunciation?: string;

  @Prop()
  level?: string;

  @Prop()
  partsOfSpeech?: string[];
  
  @Prop()
  category?: string;

  @Prop({ type: [ExampleSchema], default: [] })
  examples!: Example[];

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