import { defaultConfig } from './default-config';
import { mergeConfig } from './merge-config';
import {DeepPartial} from '@libs/common/shared/shared-types';
import {ReadOnlyRequired} from '../../../apps/web/src/common/types/common-types';
import {AppConfig} from '@libs/config/app-config';

let activeConfig = defaultConfig;

/**
 * 通过合并提供的值来覆盖默认配置。
 * 在应用启动之前使用
 */
export function setConfig(userConfig: DeepPartial<AppConfig>): void {
  activeConfig = mergeConfig(activeConfig, userConfig);
}

/**
 * 获取当前使用应用配置，一般在启用启动之前使用
 */
export function getConfig(): ReadOnlyRequired<AppConfig> {
  return activeConfig;
}
