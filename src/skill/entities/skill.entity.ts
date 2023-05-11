import { CvEntity } from '../../cv/entities/cv.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('skill')
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  designation: string;
  @ManyToMany(() => CvEntity, { cascade: true })
  @JoinTable({
    name: 'cvs_skills',
    joinColumn: { name: 'Skill', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'Cv', referencedColumnName: 'id' },
  })
  cvs: CvEntity[];
}
