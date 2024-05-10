import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  findAll() {
    return this.userRepository.find();
  }

  findOne(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  remove(email: string) {
    return this.userRepository.delete(email);
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(email, updateUserDto);
  }
}
