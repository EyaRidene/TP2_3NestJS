import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AddTodoDto } from './dtos/addTodo.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { TodoEntity } from './entities/todo.entity';
import {FindTodoDto} from "./dtos/findTodo.dto";
import {PaginatedTodoDto} from "./dtos/paginatedTodo.dto";

@Controller({ path: 'todo', version: '1' })
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Get()
  getTodoById(@Param('id') id) {
    return this.todoService.getTodoById(+id);
  }

  @Post()
  addTodo(@Body() addTodo: AddTodoDto) {
    return this.todoService.addTodo(addTodo);
  }

  @Patch()
  updateTodo(@Param('id') id, @Body() updateTodo: UpdateTodoDto) {
    return this.todoService.updateTodo(+id, updateTodo);
  }

  @Delete()
  deleteTodo(@Param('id') id) {
    return this.todoService.deleteTodo(+id);
  }
}

@Controller({ path: 'todo', version: '2' })
export class TodoControllerV2 {
  constructor(private todoService: TodoService) {}
  @Get()
  async getTodos(): Promise<TodoEntity[]> {
    return await this.todoService.getTodosV2();
  }
  @Get('pagination')
  async getTodosPaginated(
    @Query() queryParam: PaginatedTodoDto,
  ): Promise<TodoEntity[]> {
    const { page, item } = queryParam;
    return await this.todoService.paginateTodos(+page, +item);
  }
  @Get('criteria')
  async getTodoByCriteria(
    @Query() queryParam: FindTodoDto,
  ): Promise<TodoEntity[]> {
    return await this.todoService.getByCriteriaOR(queryParam);
  }
  @Get('stats')
  async CountTodos() {
    return await this.todoService.countStatus();
  }
  @Get('restore/:id')
  async restoreTodo(@Param('id', ParseIntPipe) id: number,): Promise<TodoEntity> {
    return await this.todoService.restoreTodo(id);
  }
  @Get(':id')
  async getTodoById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TodoEntity> {
    return await this.todoService.getTodoByIdV2(id);
  }
  @Post()
  async addTodo(@Body() addTodo: AddTodoDto): Promise<TodoEntity> {
    return await this.todoService.addTodoV2(addTodo);
  }
  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodo: UpdateTodoDto,
  ): Promise<TodoEntity> {
    return await this.todoService.updateTodoV2(id, updateTodo);
  }
  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.deleteTodoV2(id);
  }
  @Delete('soft/:id')
  async softDeleteTodo(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.softDeleteTodo(id);
  }
}
