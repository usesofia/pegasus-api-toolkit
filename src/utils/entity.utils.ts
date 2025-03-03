import { InternalServerErrorException } from '@nestjs/common';
import { ZodDto } from 'nestjs-zod';
import { getJsonStringfyReplacer, getJsonParseReviver } from '@app/utils/json.utils';

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
    const safeInput = JSON.parse(JSON.stringify(input, getJsonStringfyReplacer()), getJsonParseReviver());
    const validProps = entityClass.create(safeInput);
    Object.assign(entityInstance, validProps);
    Object.freeze(entityInstance);
    return entityInstance;
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
/* eslint-enable */
