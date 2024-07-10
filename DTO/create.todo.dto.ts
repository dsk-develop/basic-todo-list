import { IsDate, IsNotEmpty, IsOptional, Length, MaxLength, isDate, isValidationOptions, max } from "class-validator";
import { Transformer } from "stream/web";
export class  CreateTodoDto {
    @IsNotEmpty()
    @MaxLength(15, { message: 'Max length is 15 characters' })
    title: string;
    @IsNotEmpty()
    description: string;
    @IsDate()
    @IsOptional()
    createdDate
}