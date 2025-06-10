import typia from 'typia';
import { InternalServerErrorException } from '@nestjs/common';
import { ZodDto } from 'nestjs-zod';

function createInstance<T extends ZodDto>(c: new () => T): T {
  return new c();
}

/* eslint-disable */
// Helper function to transform Error and BigInt instances in a cloned object.
// This function modifies the object in place or returns a new primitive/transformed object.
function transformClonedInputForZod(data: any, seen = new WeakSet()): any {
  // Handle top-level BigInt
  if (typeof data === 'bigint') {
    return data.toString();
  }
  // Handle top-level Error
  if (data instanceof Error) {
    return {
      name: data.name,
      message: data.message,
      stack: data.stack,
    };
  }

  // For null, other primitives, or already processed objects (cycles)
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (seen.has(data)) {
    return data; // Already visited in current traversal path (cycle)
  }
  seen.add(data);

  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      // Recursively transform array elements
      data[i] = transformClonedInputForZod(data[i], seen);
    }
  } else {
    // For plain objects
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        // Recursively transform object properties
        data[key] = transformClonedInputForZod(data[key], seen);
      }
    }
  }
  return data;
}

export function safeInstantiateEntity<T extends ZodDto>(
  entityClass: T,
  input: any,
): InstanceType<T> {
  try {
    // 1. Fast clone with typia
    const clonedInput = typia.misc.clone(input);

    // 2. Transform Error and BigInt instances in the cloned object
    // This step ensures compatibility with what ZodDto.create might expect
    // based on the previous JSON.stringify(replacer) behavior.
    const transformedInput = transformClonedInputForZod(clonedInput);

    return entityClass.create(transformedInput);
  } catch (error) {
    // Consider more specific error handling if needed, e.g., for ZodError
    // For now, maintaining the original's broad catch.
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
    Object.freeze(entityInstance);
    return entityInstance;
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}
/* eslint-enable */