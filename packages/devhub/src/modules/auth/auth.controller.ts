import {Body, Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {isEmpty} from 'lodash';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {UserService} from '../users/user.service';
import {PasswordCiper} from '../../common/helpers/password-cipher/password-ciper';
import {HttpProcessor} from '../../decorators/http.decorator';
import {IQueryParamsResult, QueryParams} from '../../decorators/query-params.decorator';
import {AuthLogin} from './dto/auth.dto';
import {HttpBadRequestError} from '../../errors/bad-request.error';
import {LoginDto} from './dto/login.dto';
import {UserDto} from '../users/user.dto';

@ApiTags('用户权限')
@Controller('auth')
export class AuthController {
  constructor(
    protected authService: AuthService,
    protected userService: UserService,
    private passwordCipher: PasswordCiper,
  ) {
  }

  /**
   * 用户注册
   */
  @ApiOperation({summary: '注册'})
  @Post('register')
  @HttpProcessor.handle({message: '用户注册', error: HttpStatus.BAD_REQUEST})
  async register(
    @QueryParams() {visitors: {ip}}: IQueryParamsResult,
    @Body() body: AuthLogin,
  ) {
    const userDTO = new UserDto();
    userDTO.name = body.name;
    userDTO.displayName = body.displayName;
    userDTO.passwordHash = await this.passwordCipher.hash(body.password);
    // 检查用户是否存在
    const hasUser = await this.userService.findOne({
      name: body.name,
    });
    if (!isEmpty(hasUser)) {
      throw new HttpBadRequestError('用户名已存在');
    }
    await this.userService.create(userDTO);

    return this.authService.authenticate(body.name, body.password)
      .then(token => {
        return token;
      });
  }

  @ApiOperation({summary: '登录'})
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.authenticate(dto.name, dto.password)
      .then(token => {
        return token;
      });
  }

  @ApiOperation({summary: '签出'})
  signout() {
  }

  // @Get('me')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  // async user() {
  //   return user;
  // }
}
