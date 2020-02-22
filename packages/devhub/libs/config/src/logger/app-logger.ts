import {LoggerService} from '@nestjs/common';

/**
 * @description
 * 日志级别的枚举
 * @docsCategory Logger
 */
export enum LogLevel {
  /**
   * @description
   * 错误日志
   */
  Error = 0,
  Warn = 1,
  Info = 2,
  Verbose = 3,
  Debug = 4,
}

/**
 * @description
 * AppLogger 定义了日志基础调用接口
 *
 * @docsCategory Logger
 */
export interface AppLogger {
  error(message: string, context?: string, trace?: string): void;

  warn(message: string, context?: string): void;

  info(message: string, context?: string): void;

  verbose(message: string, context?: string): void;

  debug(message: string, context?: string): void;
}

const noopLogger: AppLogger = {
  error() { /* */
  },
  warn() { /* */
  },
  info() { /* */
  },
  verbose() { /* */
  },
  debug() { /* */
  },
};

/**
 * @description
 * 日志记录器负责基本应用程序中的所有日志记录
 * 目的是可以做为一个静态类去方便使用
 *
 * @example
 * ```ts
 * import { Logger } from '@app/core';
 *
 * Logger.info(`我是插件中的日志`, '来自插件');
 * ```
 *
 * 日志的自定义实现，可以控制日志最终写入在哪里
 *
 * @example
 * ```ts
 * import { AppLogger } from '@app/core';
 * import fs from 'fs';
 *
 * // 一个简单的自定义日志程序，将所有日志写入文件
 * export class SimpleFileLogger implements AppLogger {
 *     private logfile: fs.WriteStream;
 *
 *     constructor(logfileLocation: string) {
 *         this.logfile = fs.createWriteStream(logfileLocation, { flags: 'w' });
 *     }
 *
 *     error(message: string, context?: string) {
 *         this.logfile.write(`ERROR: [${context}] ${message}\n`);
 *     }
 *     warn(message: string, context?: string) {
 *         this.logfile.write(`WARN: [${context}] ${message}\n`);
 *     }
 *     info(message: string, context?: string) {
 *         this.logfile.write(`INFO: [${context}] ${message}\n`);
 *     }
 *     verbose(message: string, context?: string) {
 *         this.logfile.write(`VERBOSE: [${context}] ${message}\n`);
 *     }
 *     debug(message: string, context?: string) {
 *         this.logfile.write(`DEBUG: [${context}] ${message}\n`);
 *     }
 * }
 *
 * // in the BaseConfig
 * export const config = {
 *     // ...
 *     logger: new SimpleFileLogger('server.log'),
 * }
 * ```
 *
 * @docsCategory Logger
 */
export class Logger implements LoggerService {
  constructor(context?: string){
    this.context = context;
  }

  private static _instance: typeof Logger = Logger;
  private static _logger: AppLogger;
  private context;

  static get logger(): AppLogger {
    return this._logger || noopLogger;
  }

  private get instance(): typeof Logger {
    const {_instance} = Logger;
    return _instance;
  }

  /** @internal */
  static useLogger(logger: AppLogger) {
    Logger._logger = logger;
  }

  /** @internal */
  error(message: any, trace?: string, context?: string): any {
    this.instance.error(message, context, trace);
  }

  /** @internal */
  warn(message: any, context?: string): any {
    this.instance.warn(message, context);
  }

  /** @internal */
  log(message: any, context?: string): any {
    this.instance.info(message, context);
  }

  /** @internal */
  verbose(message: any, context?: string): any {
    this.instance.verbose(message, context);
  }

  /** @internal */
  debug(message: any, context?: string): any {
    this.instance.debug(message, context);
  }

  static error(message: string, context?: string, trace?: string): void {
    Logger.logger.error(message, context, trace);
  }

  static warn(message: string, context?: string): void {
    Logger.logger.warn(message, context);
  }

  static info(message: string, context?: string): void {
    Logger.logger.info(message, context);
  }

  static verbose(message: string, context?: string): void {
    Logger.logger.verbose(message, context);
  }

  static debug(message: string, context?: string): void {
    Logger.logger.debug(message, context);
  }
}
