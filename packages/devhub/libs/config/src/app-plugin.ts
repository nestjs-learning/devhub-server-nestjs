/**
 * @description
 * 这是一种配置和/或扩展Podcast服务器功能的方法。
 * 最简单的插件模型，只是简单地修改AppConfig对象。
 */
import {AppConfig} from './app-config';
import {Provider} from '@nestjs/common';

export interface AppPlugin {
  /**
   * @description
   *
   * 此方法在应用程序启动之前调用，可以修改 AppConfig 对象并执行其他的(异步)任务
   */
  configure?(config: Required<AppConfig>): Required<AppConfig> | Promise<Required<AppConfig>>;
  onBootstrap?(): void | Promise<void>;
  onClose?(): void | Promise<void>;
  extendAppAPI?();
  extendAdminAPI?();
  defineProviders?(): Provider[];
  defineEntities?(): Array<any>;
}
