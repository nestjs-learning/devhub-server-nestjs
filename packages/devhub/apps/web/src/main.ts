/**
 * App entry.
 * @file Index 入口文件
 * @module app/main
 */

import * as APP_CONFIG from './app.config';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import {environment, isDevMode, isProdMode} from './app.environment';
import {ApiDocument} from './api.document';
// import { ValidationPipe } from 'packages/devhub/src/pipes/validation.pipe';
// import { HttpExceptionFilter } from 'packages/devhub/src/filters/error.filter';
// import { TransformInterceptor } from 'packages/devhub/src/interceptors/transform.interceptor';
// import { LoggingInterceptor } from 'packages/devhub/src/interceptors/logging.interceptor';
// import { ErrorInterceptor } from 'packages/devhub/src/interceptors/error.interceptor';
// import { environment, isProdMode, isDevMode } from 'packages/devhub/src/app.environment';
// import { ApiDocument } from 'packages/devhub/src/api.document';

// 解决 Nodejs 环境中请求 HTTPS 的证书授信问题
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// 统一 console
const { log, warn, info } = console;
const color = c => isDevMode ? c : '';
Object.assign(global.console, {
  log: (...args) => log('[log]', '[DEV HUB]', ...args),
  warn: (...args) => warn(color('\x1b[33m%s\x1b[0m'), '[warn]', '[DEVHUB]', ...args),
  info: (...args) => info(color('\x1b[34m%s\x1b[0m'), '[info]', '[DEVHUB]', ...args),
  error: (...args) => info(color('\x1b[31m%s\x1b[0m'), '[error]', '[DEVHUB]', ...args),
});
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    isProdMode ? { logger: false } : null,
  );
  // app.use(helmet());
  // app.use(compression());
  // app.use(bodyParser.json({ limit: '1mb' }));
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));
  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(
  //   new TransformInterceptor(new Reflector()),
  //   new ErrorInterceptor(new Reflector()),
  //   new LoggingInterceptor(),
  // );

  // Swagger API 文档生成
  new ApiDocument(app).build();
  await app.listen(APP_CONFIG.APP.PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
// bootstrap();
bootstrap().then(_ => {
  console.info(`[DEV HUB Server] Run！port at ${APP_CONFIG.APP.PORT}, env: ${environment}`);
});
