import { AuthOptions, BaseConfig, RuntimeBaseConfig } from '../../common/base-config';
import { Injectable } from '@nestjs/common';
import { getConfig } from '../config/config-helpers';
import { BaseLogger, Logger } from '../config/logger/base-logger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { EntityIdStrategy } from '../config/entity-id-strategy/entity-id-strategy';

@Injectable()
export class ConfigService implements BaseConfig {
  private activeConfig: RuntimeBaseConfig;

  constructor() {
    this.activeConfig = getConfig();
    if (this.activeConfig.authOptions.disableAuth) {
      // tslint:disable-next-line
      Logger.warn('Auth已被禁用。对于生产系统来说，永远不应该出现这种情况!');
    }
  }

  get authOptions(): Required<AuthOptions> {
    return this.activeConfig.authOptions;
  }

  get port(): number {
    return this.activeConfig.port;
  }

  get cors(): boolean | CorsOptions {
    return this.activeConfig.cors;
  }

  get entityIdStrategy(): EntityIdStrategy {
    return this.activeConfig.entityIdStrategy;
  }

  get logger(): BaseLogger {
    return this.activeConfig.logger;
  }
}
