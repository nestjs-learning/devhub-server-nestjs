import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
// 中间件
// 公用模块
// import {OrmModule} from './modules/orm/orm.module';
// 业务模块
// import {UserModule} from './modules/users/user.module';
import {APP_GUARD} from '@nestjs/core';
// import {GraphQLModule} from '@nestjs/graphql';
import {JwtAuthGuard} from './guards/auth.guard';
import {HelperModule} from './processors/helper/helper.module';
import {EventBusModule} from './modules/users/event-bus/event-bus.module';
import {ConfigModule} from './modules/config/config.module';
import {AuthModule} from './modules/auth/auth.module';
import {GraphqlConfig} from './graphql-api/graphql.config';
import {CorsMiddleware} from './middlewares/cors.middleware';
import {OriginMiddleware} from './middlewares/origin.middleware';
import {UserModule} from './modules/users/user.module';
import {GraphQLModule} from '@nestjs/graphql';
import {CommonModule} from '@libs/common/common.module';

@Module({
    controllers: [ AppController ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    imports: [
        HelperModule,
        EventBusModule,
        ConfigModule,
        CommonModule,
        // CacheModule,
        // OrmModule,
        // 权限模块
        UserModule,
        // AuthModule,
        // 用户模块
        // GraphQLModule.forRootAsync({
        //     imports: [ UserModule ],
        //     useClass: GraphqlConfig,
        // }),
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
    }
}
