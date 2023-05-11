import { TodoStatusEnum } from '../enum/todoStatus.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FindTodoDto{
  @IsString()
  @IsOptional()
  criteria: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: string;
}
