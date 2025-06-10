import { InternalServerErrorException } from '@nestjs/common';
import { ZodDto } from 'nestjs-zod';

function createInstance<T extends ZodDto>(c: new () => T): T {
  return new c();
}

/* eslint-disable */
export function safeInstantiateEntity<T extends ZodDto>(
  entityClass: T,
  input: any,
): InstanceType<T> {
  try {
    const entityInstance = createInstance(entityClass);
    const validProps = entityClass.create(input);
    Object.assign(entityInstance, validProps);
    return entityInstance;
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}

export function unsafeInstantiateEntity<T extends ZodDto>(
  entityClass: T,
  input: any,
): InstanceType<T> {
  try {
    const entityInstance = createInstance(entityClass);
    const validProps = entityClass.create(input);
    Object.assign(entityInstance, validProps);
    return entityInstance;
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
/* eslint-enable */
