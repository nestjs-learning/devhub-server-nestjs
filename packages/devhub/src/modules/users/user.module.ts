import {Module} from '@nestjs/common';
import {UserController} from './controllers/user.controller';
import {OrmModule} from '../orm/orm.module';
import {UserService} from './user.service';
import {UserResolver} from './resolvers/user.resolver';

@Module({
  imports: [ OrmModule ],
  controllers: [ UserController ],
  providers: [ UserService, UserResolver ],
  exports: [ UserService ],
})
export class UserModule {
}
