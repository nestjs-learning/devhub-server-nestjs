import { Injectable } from '@nestjs/common';
import {AppConfig, AuthOptions} from '@libs/config/app-config';
import {ReadOnlyRequired} from '../../../apps/web/src/common/types/common-types';
import {getConfig} from '@libs/config/config-helpers';
import {ConnectionOptions, Options} from 'mikro-orm';
import {AppLogger} from '@libs/config/logger/app-logger';
import {AppPlugin} from '@libs/config/app-plugin';
import {RequestHandler} from 'express';
import {CorsOptions} from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class ConfigService implements AppConfig{
  private activeConfig: ReadOnlyRequired<AppConfig>;

  constructor() {
    this.activeConfig = getConfig();
  }

  get dbConnectionOptions(): Options {
    return this.activeConfig.dbConnectionOptions;
  }

  get hostname(): string {
    return this.activeConfig.hostname;
  }

  get logger(): AppLogger {
    return this.activeConfig.logger;
  }

  get middleware(): Array<{ handler: RequestHandler; route: string }> {
    return this.activeConfig.middleware;
  }

  get plugins(): AppPlugin[] {
    return this.activeConfig.plugins;
  }

  get port(): number {
    return this.activeConfig.port;
  }

  get authOptions(): AuthOptions {
    return this.activeConfig.authOptions;
  }

  get cors(): boolean | CorsOptions {
    return this.activeConfig.cors;
  }
}
