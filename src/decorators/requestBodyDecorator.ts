import { Request } from 'express';
import { plainToClass } from 'class-transformer';

export const RequestBody = (dto: any) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: Array<any>) {
    const request: Request = args[0];
    request.body = plainToClass(dto, request.body);
    return originalMethod.apply(this, args);
  };
  return descriptor;
};
