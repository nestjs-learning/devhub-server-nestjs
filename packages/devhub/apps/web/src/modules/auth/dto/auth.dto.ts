import { IsDefined, IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
// import { ApiModelProperty } from '@nestjs/swagger';
import {ApiModelProperty} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {IsEmailOrPhone} from '../isEmailOrPhone.validator';
export class AuthLogin {
  @ApiModelProperty({
    description: '昵称',
    example: '你的昵称',
  })
  @IsOptional()
  @IsString({ message: '字符串？' })
  @IsDefined()
  displayName?: string;
  @ApiModelProperty({
    description: '账户名',
    example: 'username',
  })
  @IsDefined()
  @IsNotEmpty({ message: '用户名？' })
  @IsString({ message: '字符串？' })
  @Validate(IsEmailOrPhone, {
    message: '用户名为邮件或者手机号',
  })
  name: string;

  @ApiModelProperty({
    description: '账户密码',
    example: 'abcd1234',
  })
  @IsDefined()
  @IsNotEmpty({ message: '请填写密码' })
  @IsString({ message: '字符串？' })
  password: string;
  rememberMe: boolean;
}
