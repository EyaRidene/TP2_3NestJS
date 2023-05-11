import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSkillDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
