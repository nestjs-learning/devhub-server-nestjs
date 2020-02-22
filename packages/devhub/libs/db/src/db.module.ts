import {Module} from '@nestjs/common';
import {DbService} from './db.service';
import {MikroOrmModule} from 'nestjs-mikro-orm';
import {config} from './db.config';
import {User} from '@libs/db/entities';
import {ConfigModule} from '@libs/config/config.module';
import {ConfigService} from '@libs/config/config.service';

@Module({
    imports: [
        ConfigModule,
        MikroOrmModule.forRoot(config),
        MikroOrmModule.forFeature({
            entities: [User],
        }),
    ],
    providers: [ DbService, ConfigService],
    exports: [ MikroOrmModule, DbService ],
})
export class DbModule {
}
