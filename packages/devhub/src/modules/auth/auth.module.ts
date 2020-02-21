/**
 * Auth module.
 * @file 权限与管理员模块
 * @module module/auth/module
 */

import * as APP_CONFIG from '../../app.config';
import {Secret} from 'jsonwebtoken';
import { Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import {OrmModule} from '../orm/orm.module';
import {ConfigService} from '../config/config.service';
import {EventBus} from '../users/event-bus/event-bus';
import {PasswordCiper} from '../../common/helpers/password-cipher/password-ciper';
import {UserService} from '../users/user.service';

@Module({
  imports: [
    OrmModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: APP_CONFIG.AUTH.jwtTokenSecret as Secret,
      signOptions: {
        expiresIn: APP_CONFIG.AUTH.expiresIn as number,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [ConfigService, EventBus, UserService, AuthService, JwtStrategy, PasswordCiper],
  exports: [AuthService, PasswordCiper, ConfigService],
})
export class AuthModule {
}
