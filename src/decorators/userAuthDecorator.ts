import { get } from 'lodash';
import { Request, Response } from 'express';
// @ts-ignore
import config from '../config.js';

const failRequest = (response: Response) => {
  response.status(401);
  response.json({});
};

const getToken = (request: Request) => {
  const token = get(request, 'headers.authorization');
  if (token) {
    return token;
  }
  return get(request, 'cookies.token');
};

export const UserAuth = (isTokenRequired: Boolean = true) => (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: Array<any>) {
    const request: Request = args[0];
    const response: Response = args[1];
    const token = getToken(request);
    if (token) {
      return originalMethod.apply(this, args);
    } else if (isTokenRequired) {
      failRequest(response);
    } else {
      return originalMethod.apply(this, args);
    }
  };
  return descriptor;
};
