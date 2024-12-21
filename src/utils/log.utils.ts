import { LogLevel } from '@nestjs/common';
import { Base } from '../base';

export function Log(level: LogLevel = 'log') {
  return function (
    target: Base,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const instance = this as Base;
      const functionName = propertyKey;

      // Log method call with input parameters
      instance.logLevel({
        functionName,
        level,
        suffix: 'input',
        data: { args },
      });

      try {
        const result = originalMethod.apply(this, args);

        // Handle both Promise and non-Promise results
        if (result instanceof Promise) {
          return result
            .then((resolvedResult) => {
              // Log successful response
              instance.logLevel({
                functionName,
                level,
                suffix: 'output',
                data: { result: resolvedResult },
              });
              return resolvedResult;
            })
            .catch((error) => {
              // Log error if method throws
              instance.logLevel({
                functionName,
                level: 'warn',
                suffix: 'error',
                data: { error },
              });
              throw error;
            });
        }

        // Handle synchronous results
        instance.logLevel({
          functionName,
          level,
          suffix: 'output',
          data: { result },
        });
        return result;
      } catch (error) {
        // Log error if synchronous method throws
        instance.logLevel({
          functionName,
          level: 'warn',
          suffix: 'treatableError',
          data: { error },
        });
        throw error;
      }
    };

    return descriptor;
  };
}
