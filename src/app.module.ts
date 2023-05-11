import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { TodoEntity } from './todo/entities/todo.entity';
import { CvEntity } from './cv/entities/cv.entity';
import { UserEntity } from './user/entities/user.entity';
import { SkillEntity } from './skill/entities/skill.entity';
import { AuthMiddleware } from './Middelware/authentification.middelware';

@Module({
  imports: [
    TodoModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tp3nest',
      entities: [TodoEntity, CvEntity, UserEntity, SkillEntity],
      synchronize: true,
    }),
    CvModule,
    SkillModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'todo', method: RequestMethod.GET });
  }
}
