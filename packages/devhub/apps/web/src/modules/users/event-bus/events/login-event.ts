// import { RequestContext } from '@app/common/request-context';

import {BaseEvent} from '../base-event';

/**
 * @description
 * 当用户通过 API `login` 成功登录时，将触发此事件。
 *
 * @docsCategory events
 * @docsPage Event Types
 */
export class LoginEvent extends BaseEvent {
  // constructor(public ctx: RequestContext, public user: User) {
  //   super();
  // }
}
