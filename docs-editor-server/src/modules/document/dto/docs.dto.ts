import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDataDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
