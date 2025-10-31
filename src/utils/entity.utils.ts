import {
  getJsonParseReviver,
  getJsonStringifyReplacer,
} from '@app/utils/json.utils';
import { ZodDto } from 'nestjs-zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createInstance<T extends ZodDto<any>>(c: new () => T): T {
  return new c();
}

/* eslint-disable */
export function safeInstantiateEntity<T extends ZodDto<any>>(
  entityClass: T,
  input: any,
): InstanceType<T> {
  const entityInstance = createInstance(entityClass);
  const safeInput = JSON.parse(
    JSON.stringify(input, getJsonStringifyReplacer()),
    getJsonParseReviver(),
  );
  const validProps = entityClass.create(safeInput);
  Object.assign(entityInstance, validProps);
  Object.freeze(entityInstance);
  return entityInstance;
}

export function unsafeInstantiateEntity<T extends ZodDto<any>>(
  entityClass: T,
  input: any,
): InstanceType<T> {
  const entityInstance = createInstance(entityClass);
  const validProps = entityClass.create(input);
  Object.assign(entityInstance, validProps);
  Object.freeze(entityInstance);
  return entityInstance;
}
/* eslint-enable */
