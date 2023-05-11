import { TodoStatusEnum } from '../enum/todoStatus.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../../../Generics/timeStamp.entity';

@Entity('todo')
export class TodoEntity extends TimeStampEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: string;
}
