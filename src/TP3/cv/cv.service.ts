import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CvEntity } from './entities/cv.entity';
import { AddCvDto } from './dtos/addCv.dto';
import { UpdateCVDto } from './dtos/updateCV.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}
  async create(createCvDto: AddCvDto) {
    const newCv = this.cvRepository.create(createCvDto);
    return await this.cvRepository.save(newCv);
  }

  async findAll() {
    return await this.cvRepository.find();
  }

  async findOne(id: number) {
    const promise= this.cvRepository.findBy({ id:id });
    if (!promise) {
      throw new NotFoundException("cv not found");
    }
    return await promise;
  }

  async update(id: number, updateCvDto: UpdateCVDto) {
    return await this.cvRepository.update(id, updateCvDto);

  }

  async remove(id: number) {
    return this.cvRepository.delete(id);
  }
}

