import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';

const transformValidationErrorsToJSON = (errors: ValidationError[]) => {
  return errors.reduce((p: any, c: ValidationError) => {
    if (!c.children || !c.children.length) {
      // @ts-ignore
      p[c.property] = Object.keys(c.constraints).map((key) => c.constraints[key]);
    } else {
      p[c.property] = transformValidationErrorsToJSON(c.children);
    }
    return p;
  }, {});
};

export const ValidateBody = (dto: any) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: Array<any>) {
    const request: Request = args[0];
    const response: Response = args[1];
    const model = plainToClass(dto, request.body);
    const errors = await validate(model);
    if (errors.length > 0) {
      response.status(400);
      response.json({ errors: transformValidationErrorsToJSON(errors) });
      return;
    }
    return await originalMethod.apply(this, args);
  };
  return descriptor;
};
