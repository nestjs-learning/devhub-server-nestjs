import {DynamicModule, Module, OnModuleInit} from '@nestjs/common';
import {ServiceService} from './service.service';
import {MikroORM} from 'mikro-orm';
import {MikroOrmModule} from 'nestjs-mikro-orm';
import {ConfigModule} from '@libs/config/config.module';
import {ConfigService} from '@libs/config/config.service';

let defaultOrmModule: DynamicModule;

@Module({
  providers: [ ServiceService ],
  exports: [ ServiceService ],
})
export class ServiceCoreModule implements OnModuleInit {
  async onModuleInit() {
    // init global setting
    // init roles
    // init administrators
    // init payment
  }
}

export class ServiceModule {
  static forRoot(): DynamicModule {
    if (!defaultOrmModule) {
      defaultOrmModule = MikroOrmModule.forRootAsync({
        imports: [ ConfigModule ],
        useFactory: (configService: ConfigService) => {
          return configService.dbConnectionOptions;
        },
        inject: [ ConfigService ],
      });
    }
    return {
      module: ServiceModule,
      imports: [ defaultOrmModule ],
    };
  }
}
