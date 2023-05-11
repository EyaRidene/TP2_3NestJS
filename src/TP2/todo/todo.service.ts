import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from './models/todo.model';
import { AddTodoDto } from './dtos/addTodo.dto';
import { TodoStatusEnum } from './enum/todoStatus.enum';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { Provide_Tokens } from '../../common/common.module';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { FindTodoDto } from './dtos/findTodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedTodoDto } from './dtos/paginatedTodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  @Inject(Provide_Tokens.uuid) uuid: () => number;
  todos: TodoModel[] = [];

  getTodos(): TodoModel[] {
    return this.todos;
  }
  getTodoById(id: number): TodoModel {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException('Todo with this id not found');
    }
    return todo;
  }
  addTodo(addTodo: AddTodoDto): TodoModel {
    const todo: TodoModel = {
      id: this.uuid(),
      name: addTodo.name,
      description: addTodo.description,
      createdAt: new Date(),
      status: TodoStatusEnum.waiting,
    };
    this.todos.push(todo);
    return todo;
  }
  updateTodo(id: number, newTodo: UpdateTodoDto): TodoModel {
    const todo = this.getTodoById(id);
    if (newTodo.name) todo.name = newTodo.name;
    if (newTodo.description) todo.description = newTodo.description;
    if (newTodo.status) todo.status = newTodo.status;
    return todo;
  }
  deleteTodo(id: number) {
    const index = this.todos.findIndex((todo: TodoModel) => todo.id === id);
    if (index >= 0) this.todos.splice(index, 1);
    else {
      throw new NotFoundException(`Le todo d id ${id} n existe pas !`);
    }
    return {
      message: `Le todo d id ${id} a été supprimé `,
      count: 1,
    };
  }

  paginating(
    query: SelectQueryBuilder<TodoEntity>,
    queryString: PaginatedTodoDto,
  ) {
    const page = queryString.page || 1;
    query = query
      .offset((page - 1) * queryString.item || 5)
      .limit(queryString.item || 5);
    return this;
  }
  async getTodosV2(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }
  async paginateTodos(page: number, offset: number) {
    return await this.todoRepository.find({
      skip: offset * page,
      take: offset,
    });
  }
  async getTodosV2Paginated({
    page,
    item,
  }: PaginatedTodoDto): Promise<TodoEntity[]> {
    const query = this.todoRepository.createQueryBuilder('todo');
    const pagination = { page, item };
    return this.paginating(query, pagination).todoRepository.find();
  }

  async getTodoByIdV2(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException('Todo with this id not found');
    }
    return todo;
  }
  async addTodoV2(newTodo: AddTodoDto): Promise<TodoEntity> {
    return await this.todoRepository.save(newTodo);
  }
  async updateTodoV2(
    id: number,
    updateTodo: UpdateTodoDto,
  ): Promise<TodoEntity> {
    const todo = await this.todoRepository.save({
      id,
      ...updateTodo,
    });
    if (!todo) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }
  async deleteTodoV2(id: number) {
    await this.todoRepository.delete(id);
    return {
      message: `Le todo d id ${id} a été supprimé `,
      count: 1,
    };
  }
  async softDeleteTodo(id: number) {
    await this.todoRepository.softDelete(id);
    return {
      message: `Le todo d id ${id} a été supprimé `,
      count: 1,
    };
  }
  async restoreTodo(id: number): Promise<TodoEntity> {
    await this.todoRepository.restore(id);
    return await this.getTodoByIdV2(id);
  }
  async countStatus() {
    const EnCours = await this.todoRepository.count({where : {status : TodoStatusEnum.actif}});
    const EnAttente = await this.todoRepository.count({where : {status : TodoStatusEnum.waiting}});
    const fin = await this.todoRepository.count({where : {status : TodoStatusEnum.done}});
    return { actif: EnCours, waiting: EnAttente, done: fin };
  }

  /*  async getTodoByCriteria({
    criteria,
    status,
  }: FindTodoDto): Promise<TodoEntity[]> {
    const query = this.todoRepository.createQueryBuilder('todo');
    if (criteria) {
      await query
        .where('todo.name LIKE :data', { data: `%${criteria}%` })
        .orWhere('todo.description LIKE :data', { data: `%${criteria}%` });
    }
    if (status) {
      await query.andWhere('todo.status = :status', { status:status });
    }
    return query.getMany();
  }*/
  async getByCriteriaOR(searchDto: FindTodoDto) {
    const { status, criteria } = searchDto;
    const qb = this.todoRepository.createQueryBuilder('todo');
    if (status) {
      return await qb
        .where({
          status: In([
            TodoStatusEnum.actif,
            TodoStatusEnum.done,
            TodoStatusEnum.waiting,
          ]),
        })
        .getRawMany();
    }
    if (criteria) {
      return await qb
        .where('todo.name= :criteria OR todo.description= :criteria')
        .setParameters({ criteria })
        .getRawMany();
    }
    return await this.getTodos();
  }
}
