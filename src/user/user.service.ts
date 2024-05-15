/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Interest } from './entities/interest.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}
  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const userData = await this.userRepository.findOneBy({ id: id });
    const { email, nickname, password } = userData;
    const interestData = await this.interestRepository.findBy({
      user_id: id,
    });
    const getInterest = interestData.map((data) => data.interest);
    const userMergedData = {
      id,
      email,
      nickname,
      interests: getInterest,
    };

    return userMergedData;
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      const createUser = await this.userRepository.save(createUserDto);
      // console.log(createUser);

      const interests = createUser.interests;
      const createInterestsPromises = interests.map((interest) => {
        const newInterest = {
          user_id: createUser.id,
          interest: interest,
        };
        return this.interestRepository.save(newInterest);
      });

      // await Promise.all(createInterestsPromises);
      // console.log(createInterestsPromises);

      return createUser;
    } else {
      throw new Error('이미 가입된 이메일 주소입니다.');
    }
  }

  login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const userHere = this.userRepository.findOne({
      where: {
        email,
        password,
      },
    });
    if (userHere) {
      return this.userRepository.findOne({
        where: {
          email,
          password,
        },
      });
    } else {
      return console.log('User not found');
    }
  }

  remove(email: string) {
    return this.userRepository.delete(email);
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(email, updateUserDto);
  }
}
