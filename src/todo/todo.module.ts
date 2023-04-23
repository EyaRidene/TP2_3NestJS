import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoControllerV2 } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService],
  controllers: [TodoControllerV2],
})
export class TodoModule {}
