
export class EventDto {
    _id!: string;

    type!: string;

    title!: string;

    date!: Date;

    location!: string;

    time_start!: string;

    document!: string;

    link!: string;

    description!: string;

    color!: string

    createAt!: Date;

    updateAt!: Date;

    deleteAt!: Date | null
}