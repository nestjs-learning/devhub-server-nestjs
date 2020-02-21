import {Body, Controller, Get, Post} from '@nestjs/common';
import {InjectRepository} from 'nestjs-mikro-orm';
import {EntityRepository} from 'mikro-orm';
import {ancestorWhere} from 'tslint';
import {User} from '../user.entity';
import {Permission} from '../../../common/generated-types';
import {Allow} from '../../../decorators/allow.decorator';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {
  }

  @Get()
  @Allow(Permission.Authenticated, Permission.Owner)
  async find() {
    return await this.userRepository.findAll();
  }
}
