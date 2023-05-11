import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillEntity } from './entities/skill.entity';
import { UpdateSkillDto } from './dtos/updateSkill.dto';
import { AddSkillDto } from './dtos/addSkill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private skillRepository: Repository<SkillEntity>,
  ) {}

  async create(createSkillDto: AddSkillDto): Promise<SkillEntity> {
    return await this.skillRepository.save(createSkillDto);
  }

  async getAll() {
    return await this.skillRepository.find();
  }

  async getSkillById(id: number) {
    return await this.skillRepository.findOneBy({ id });
  }

  async updateSkill(
    id: number,
    updateSkill: UpdateSkillDto,
  ): Promise<SkillEntity> {
    const skill = await this.skillRepository.save({
      id,
      ...updateSkill,
    });
    if (!skill) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return skill;
  }

  async deleteSkill(id: number) {
    return await this.skillRepository.delete(id);
  }
}
