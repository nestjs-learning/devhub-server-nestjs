import {ReadOnlyRequired} from '../../../apps/web/src/common/types/common-types';
import {AppConfig} from '@libs/config/app-config';
import {DefaultLogger} from './logger/default-logger';
import {Logger} from '@libs/config/logger/app-logger';

const logger = new Logger();

export interface AuthOptions {
  /**
   * @default bearer
   */
  tokenMethod?: 'cookie' | 'bearer';
  /**
   * Token 密钥
   */
  jwtTokenSecret?: string;

  /**
   * @description
   * 设置 header 头属性
   *
   * @default `Authorization`
   */
  authTokenHeaderKey?: string;
  /**
   * @description
   * 设置过期时间
   *
   * [zeit/ms](https://github.com/zeit/ms.js).  Eg: `60`, `'2 days'`, `'10h'`, `'7d'`
   *
   * @default '3d'
   */
  expiresIn?: string | number;
}

export const defaultConfig: ReadOnlyRequired<AppConfig> = {
  hostname: '',
  port: 5000,
  dbConnectionOptions: {
    entities: [],
    entitiesDirsTs: [ 'src' ],
    dbName: 'dev-hub',
    type: 'mongo',
    debug: true,
    logger: logger.log.bind(logger),
  },
  logger: new DefaultLogger(),
  middleware: [],
  plugins: [],
  authOptions: {
    jwtTokenSecret: 'app-token', tokenMethod: 'bearer', expiresIn: 3600,
  },
  cors: {
    origin: true,
    credentials: true,
  },
};
