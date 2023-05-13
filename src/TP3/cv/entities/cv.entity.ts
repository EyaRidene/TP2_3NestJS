import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStampEntity } from '../../../Generics/timeStamp.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { SkillEntity } from '../../skill/entities/skill.entity';
@Entity('cv')
export class CvEntity extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne((type) => UserEntity, (user) => user.cvs, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  user: UserEntity;

  @ManyToMany((type) => SkillEntity, (skill) => skill.cvs, {
    eager: true,
  })
  skills: SkillEntity[];
}
