import { Request, Response } from 'express';
// import ms from 'ms';
// import * as _ from 'lodash';
import {AuthOptions} from './base-config';

/**
 * 将authToken设置为cookie或响应标头，具体取决于配置设置。
 */
export function setAuthToken(options: {
  authToken: string;
  rememberMe: boolean;
  authOptions: Required<AuthOptions>;
  req: Request;
  res: Response;
}) {
  const { authToken, rememberMe, authOptions, req, res } = options;
  // if (authOptions.tokenMethod === 'cookie') {
  //   if (_.has(req, 'session')) {
  //     if (rememberMe) {
  //       req.sessionOptions.maxAge = ms('1y');
  //     }
  //     req.session.token = authToken;
  //   }
  // } else {
  //   res.set(authOptions.authTokenHeaderKey, authToken);
  //   console.log(res);
  // }
}
