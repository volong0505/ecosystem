import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Word } from '@ecosystem/infra-database';
import { CreateWordRequest, FindWordsRequest } from '@ecosystem/api-interfaces';

@Injectable()
export class WordRepository {

  constructor(
    @InjectModel(Word.name)
    private readonly model: Model<Word>,
  ) {}

  async create(vocab: Partial<CreateWordRequest>): Promise<Word> {
    const _id = new Types.ObjectId()
    return this.model.create({_id, ...vocab, creationDate: new Date});
  }

  async findAllByLanguage(params: FindWordsRequest): Promise<Word[]> {
    const {keyword, languageCode, sortField, sortOrder, page = 1} = params; 
    const limit = 12; // Number of items per page 
    
    const conditions: any = {
      languageCode: languageCode,
    }

    if (keyword) {
      conditions['$or'] = [
        { word:  {$regex: keyword, $options: 'i'}},
        { translation:  {$regex: keyword, $options: 'i'}}
      ]
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
      conditions['$or'] = [
        { word:  {$regex: keyword, $options: 'i'}},
        { translation:  {$regex: keyword, $options: 'i'}}
      ]
    }

    let query = this.model.countDocuments(conditions);
    return query.exec()
  }

  findOne(id: string): Promise<Word | null> {
    const _id = new Types.ObjectId(id)
    return this.model.findById(_id).exec();
  }

  findByWord(value: string): Promise<Word | null> {
    return this.model.findOne({
      $or: [
        { word:  {$regex: value, $options: 'i'}},
        { translation:  {$regex: value, $options: 'i'}}
      ],
    })
  }

  async findByCategory(languageCode: string, category: string): Promise<Word[]> {
    return this.model.find({ languageCode, category }).exec();
  }

  async updateById(id: string, update: Partial<Word>): Promise<Word | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}