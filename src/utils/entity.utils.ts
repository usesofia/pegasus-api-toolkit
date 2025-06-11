import { InternalServerErrorException } from '@nestjs/common';
import { ZodDto } from 'nestjs-zod';
import deepcopy from 'deepcopy';

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
    const seen = new WeakSet();
    const safeInput = deepcopy(input, {
      customizer: (obj) => {
        if (obj instanceof Error) {
          return {
            name: obj.name,
            message: obj.message,
            stack: obj.stack,
          };
        }
        if (typeof obj === 'bigint') {
          return obj.toString();
        }
        if (typeof obj === 'object' && obj !== null) {
          if (seen.has(obj)) {
            return;
          }
          seen.add(obj);
        }
        return obj;
      },
    });
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
