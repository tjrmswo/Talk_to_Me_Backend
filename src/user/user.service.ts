/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Interest } from './entities/interest.entity';
import { SocialUserCreateDto } from './dto/social-create-user.dto';
import { SocialUserLoginDTO } from './dto/social-login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}
  async findAll() {
    const userData = await this.userRepository.find();

    // interest 객체들을 매핑하기 위해 id 값을 배열로 추출합니다
    const userIds = userData.map((user) => user.id);

    // interest 객체들을 조회합니다
    const interestPromises = userIds.map((id) =>
      this.interestRepository.findBy({
        user_id: id,
      }),
    );

    const interestData = await Promise.all(interestPromises);
    console.log('interestData', interestData);
    console.log('userData', userData);
    // userData와 interestData를 매핑하여 객체화합니다
    const mappedData = userData.map((user, index) => {
      const userInterests = interestData[index].map((interest) => {
        if (interest.user_id === user.id) {
          return interest.interest;
        }
      });
      const { id, password, ...userWithoutPasswordandID } = user;
      return { ...userWithoutPasswordandID, interests: userInterests };
    });
    // console.log('mappedData: ', mappedData);
    return mappedData;
  }

  async findOne(id: number) {
    const userData = await this.userRepository.findOneBy({ id: id });
    const { email, nickname } = userData;
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

  socialUserCreate(socialLoginUserDto: SocialUserCreateDto) {
    console.log(socialLoginUserDto);
    const socialLoginUser = this.userRepository.save(socialLoginUserDto);
    return socialLoginUser;
    // const existingUser = this.userRepository.findOne({
    //   where: {
    //     kakao_id: socialLoginUserDto.kakao_id,
    //   },
    // });
    // if (existingUser) {
    //   return console.log('User already exists');
    // } else {
    //   const socialLoginUser = this.userRepository.save(socialLoginUserDto);
    //   return socialLoginUser;
    // }
  }

  async socialUserLogin(kakao_id: number) {
    const existingUser = await this.userRepository.findOne({
      where: {
        kakao_id: kakao_id,
      },
    });

    if (existingUser) {
      return existingUser;
    } else {
      return console.log('User Not signed in');
    }
  }

  remove(email: string) {
    return this.userRepository.delete(email);
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(email, updateUserDto);
  }
}
