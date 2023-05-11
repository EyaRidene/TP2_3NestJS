import { TodoStatusEnum } from '../enum/todoStatus.enum';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsOptional()
  status: TodoStatusEnum;
}
