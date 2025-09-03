import { WordDto } from "./word.dto";

export class FindWordRequest {
    id!: string;
}

export class FindWordResponse {
    data!: WordDto | {};
}