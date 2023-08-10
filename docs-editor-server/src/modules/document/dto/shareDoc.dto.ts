import { IsNotEmpty, IsString } from 'class-validator';

export class ShareDocumentDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  documentId: string;
}
