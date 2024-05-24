import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SocialUserCreateDto } from './dto/social-create-user.dto';
import { SocialUserLoginDTO } from './dto/social-login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll() {
    const data = this.userService.findAll();
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
  @Post('/socialSignup')
  async socialUserCreate(@Body() socialLoginUserDto: SocialUserCreateDto) {
    const signUp = await this.userService.socialUserCreate(socialLoginUserDto);
    if (signUp) {
      throw new HttpException(
        {
          data: signUp,
          status: HttpStatus.OK,
          statusText: 'OK',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: Error,
        },
      );
    }
    return this.userService.socialUserCreate(socialLoginUserDto);
  }

  @Post('/socialLogin')
  async socialUserLogin(@Body() id: SocialUserLoginDTO) {
    console.log(
      'socialLogin: ',
      await this.userService.socialUserLogin(id.kakao_id),
    );
    const loginStatus = await this.userService.socialUserLogin(id.kakao_id);
    if (loginStatus) {
      throw new HttpException(
        {
          data: loginStatus,
          status: HttpStatus.OK,
          statusText: 'OK',
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: Error,
        },
      );
    }
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(email, updateUser);
  }
}
