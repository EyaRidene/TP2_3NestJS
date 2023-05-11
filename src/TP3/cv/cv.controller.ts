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
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';
import { AddCvDto } from './dtos/addCv.dto';
import { UpdateCVDto } from './dtos/updateCV.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}
  @Get()
  async findAll(): Promise<CvEntity[]> {
    return await this.cvService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.findOne(id);
  }
  @Post()
  async create(@Body() cv: AddCvDto): Promise<CvEntity> {
    return await this.cvService.create(cv);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCVDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cvService.remove(id);
  }
}
