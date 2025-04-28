import {
  getJsonParseReviver,
  getJsonStringifyReplacer,
} from '@app/utils/json.utils';
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
    const safeInput = JSON.parse(
      JSON.stringify(input, getJsonStringifyReplacer()),
      getJsonParseReviver(),
    );
    const validProps = entityClass.create(safeInput);
    Object.assign(entityInstance, validProps);
    Object.freeze(entityInstance);
    return entityInstance;
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}

export function unsafeInstantiateEntity<T extends ZodDto>(
  entityClass: T,
  input: any,
): InstanceType<T> {
  const entityInstance = createInstance(entityClass);
  try {
    const validProps = entityClass.create(input);
    Object.assign(entityInstance, validProps);
    Object.freeze(entityInstance);
    return entityInstance;
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
/* eslint-enable */