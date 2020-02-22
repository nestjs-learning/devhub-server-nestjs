import {Options} from 'mikro-orm';
import {Logger} from '@libs/config/logger/app-logger';
import {User} from '@libs/db/entities';
const logger = new Logger('MikroOrm');

const config = {
  entities: [ User ],
  entitiesDirsTs: [ 'src' ],
  dbName: 'dev-hub',
  // clientUrl: 'mongodb://mongodb:27017',
  // host: 'mongodb',
  // port: 27017,
  type: 'mongo',
  debug: true,
  logger: logger.log.bind(logger),
} as Options;

export {config};
