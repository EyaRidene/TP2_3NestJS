import { TodoStatusEnum } from '../enum/todoStatus.enum';

export class TodoModel {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
}
