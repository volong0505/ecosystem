import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Word, WordDocument } from '@ecosystem/infra-database';
import { CreateWordRequest, FindWordsRequest } from '@ecosystem/api-interfaces';

@Injectable()
export class WordRepository {
  constructor(

    @InjectModel(Word.name)
    private readonly model: Model<WordDocument>,
  ) {}

  async create(vocab: Partial<CreateWordRequest>): Promise<Word> {
    const _id = new Types.ObjectId()
    return this.model.create({_id, ...vocab, creationDate: new Date});
  }

  async findAllByLanguage(params: FindWordsRequest): Promise<Word[]> {
    const {keyword, languageCode, sortField, sortOrder, page = 1} = params; 
    const limit = 10; // Number of items per page 
    
    const conditions: any = {
      languageCode: languageCode,
    }

    if (keyword) {
      conditions['word'] = { $regex: keyword, $options: 'i' }; // Case-insensitive search
    }

    let query = this.model.find(conditions);

    if (sortField && sortOrder) {
      const orderValue = sortOrder === 'desc' || sortOrder === '-1' ? -1 : 1;
      query = query.sort({ [sortField]: orderValue });
    }
    
    query = query.skip((page - 1) * limit).limit(limit);

    return query.exec();
  }

  async countTotal(params: any): Promise<number> {
       const { languageCode, keyword} = params;  
    
    const conditions: any = {
      languageCode: languageCode,
    }

    if (keyword) {
      conditions['word'] = { $regex: keyword, $options: 'i' }; // Case-insensitive search
    }
    let query = this.model.countDocuments(conditions);
    return query.exec()
  }

  findOne(id: string): Promise<Word | null> {
    const _id = new Types.ObjectId(id)
    return this.model.findById(_id).exec();
  }

  async findBytags(languageCode: string, tags: string): Promise<Word[]> {
    return this.model.find({ languageCode, tags }).exec();
  }

  async updateById(id: string, update: Partial<Word>): Promise<Word | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async updateReviewedAt(id: string): Promise<Word | null> {
    const reviewedAt = new Date();
    console.log(new Types.ObjectId(id))
    return await this.model.findByIdAndUpdate(new Types.ObjectId(id), { reviewedAt }).exec();
  }

  async getWordToReview(): Promise<Word> {
    return await this.model.find().sort({ reviewedAt: 1 }).limit(1).exec().then(words => words[0]);
  }
}