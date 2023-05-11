// il manque les messages d'erreurs
import { IsNotEmpty, IsString } from 'class-validator';

export class AddTodoDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
}
