import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AddUserDto } from './dtos/addUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async addUser(addUser: AddUserDto) {
    const user = new UserEntity();
    user.email = addUser.email;
    user.username = addUser.username;
    user.salt = bcrypt.genSaltSync();
    user.password = await bcrypt.hash(addUser.password, user.salt);
    await this.userRepository.save(user);
    return {
      username: user.username,
      email: user.email,
    };
  }

  async getAll() {
    return await this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    console.log(user);
    if (!user) throw new NotFoundException('User with this id not found!');
    return user;
  }

  async updateUser(id: number, updateUser: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (updateUser.password) {
      user.salt = bcrypt.genSaltSync();
      user.password = await bcrypt.hash(updateUser.password, user.salt);
    }
    user.email = updateUser.email ?? user.email;
    user.username = updateUser.username ?? user.username;
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
