import {Global, Module} from '@nestjs/common';
import {CommonService} from './common.service';
import {ConfigModule} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {DbModule} from '@libs/db/db.module';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            useFactory() {
                return {
                    secret: process.env.SECRET,
                };
            },
        }),
        DbModule,
    ],
    providers: [ CommonService ],
    exports: [ CommonService, JwtModule ],
})
export class CommonModule {
}
