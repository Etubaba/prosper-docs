import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class SaveDocumentDto {
    @IsNotEmpty()
    @IsString()
    documentId: string;


    @IsNotEmpty()
    data: any


}
