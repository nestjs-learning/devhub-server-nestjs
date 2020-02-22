import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';

// coreEntities
import {User} from '../users/user.entity';
import {config} from '../../mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  exports: [ MikroOrmModule ],
})
export class OrmModule {
}
