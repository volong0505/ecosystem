import { IsNotEmpty } from "class-validator";
import { EventDto } from "./event.dto";

export class CreateEventRequest {
    @IsNotEmpty()
    type?: string;

    @IsNotEmpty()
    title!: string;
    location!: string;

    @IsNotEmpty()
    date!: Date;
    
    time_start!: string | null;
    link!: string;
    description!: string
    color!: string
}

export class CreateEventResponse {
    data!: EventDto
}