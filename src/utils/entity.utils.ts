import { InternalServerErrorException } from '@nestjs/common';
import { ZodDto } from 'nestjs-zod';

function createInstance<T extends ZodDto>(c: new () => T): T {
  return new c();
}

function getStringfyReplacer() {
  const seen = new WeakSet();
  return (key: string, value: unknown) => {
    if (value instanceof Error) {
      return {
        name: value.name,
        message: value.message,
        stack: value.stack,
      };
    }
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

/* eslint-disable */
export function safeInstantiateEntity<T extends ZodDto>(
  entityClass: T,
  input: any,
): InstanceType<T> {
  try {
    const entityInstance = createInstance(entityClass);
    const safeInput = JSON.parse(JSON.stringify(input, getStringfyReplacer()));
    const validProps = entityClass.create(safeInput);
    Object.assign(entityInstance, validProps);
    Object.freeze(entityInstance);
    return entityInstance;
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
/* eslint-enable */
