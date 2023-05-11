import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { AddSkillDto } from './dtos/addSkill.dto';
import { SkillEntity } from './entities/skill.entity';
import { UpdateSkillDto } from './dtos/updateSkill.dto';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  async create(@Body() createSkillDto: AddSkillDto): Promise<SkillEntity> {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  async findAll(): Promise<SkillEntity[]> {
    return this.skillService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SkillEntity> {
    return this.skillService.getSkillById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillService.updateSkill(id, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.skillService.deleteSkill(id);
  }
}
