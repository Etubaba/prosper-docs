import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDocDto {
  @IsOptional()
  title: string;
  @IsOptional()
  content: object;
}
