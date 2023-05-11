import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../Generics/timeStamp.entity';
import { CvEntity } from '../../cv/entities/cv.entity';

@Entity('user')
export class UserEntity extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => CvEntity, (cv) => cv.user, {
    cascade: true,
  })
  cvs: CvEntity[];
}
