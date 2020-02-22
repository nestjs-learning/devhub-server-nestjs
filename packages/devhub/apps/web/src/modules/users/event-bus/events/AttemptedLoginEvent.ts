/**
 * @description
 * 当尝试 “login” 登录时，将触发此事件。
 *
 * @docsCategory events
 * @docsPage Event Types
 */
import {BaseEvent} from '../base-event';

// import { RequestContext } from '@app/common/request-context';

export class AttemptedLoginEvent extends BaseEvent {
  constructor(public identifier: string) {
    super();
  }
}
