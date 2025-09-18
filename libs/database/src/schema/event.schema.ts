import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types} from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({collection: "events"})
export class Events {
    @Prop()
    _id!: Types.ObjectId;

    @Prop()
    type!: string;

    @Prop()
    title!: string;

    @Prop()
    date!: Date;

    @Prop()
    location!: string;

    @Prop()
    time_start!: string;

    @Prop()
    document!: string;

    @Prop()
    link!: string;

    @Prop()
    description!: string;

    @Prop()
    color!: string

    @Prop()
    createAt!: Date;

    @Prop()
    updateAt!: Date;

    @Prop()
    deleteAt!: Date;
    

}

export const EventSchema = SchemaFactory.createForClass(Event);

export const EventSchemaFeature: ModelDefinition = {
    name: Event.name,
    schema: EventSchema
}