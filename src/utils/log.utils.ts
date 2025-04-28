/* eslint-disable */

import { LogLevel } from '@nestjs/common';
import { Base } from '@app/base';

export function Log(
  level: LogLevel | 'controller' = 'debug',
) {
  return function (
    target: Base,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const finalInputLevel = level === 'controller' ? 'log' : level;
    const finalOutputLevel = level === 'controller' ? 'debug' : level;

    descriptor.value = function (...args: any[]) {
      const instance = this as Base;
      const functionName = propertyKey;

      // Log method call with input parameters
      instance.logLevel({
        functionName,
        level: finalInputLevel,
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
                level: finalOutputLevel,
                suffix: 'output',
                data: { result: resolvedResult },
              });
              return resolvedResult;
            })
            .catch((error) => {
              // Log error if method throws
              instance.logLevel({
                functionName,
                level: 'log',
                suffix: 'treatableError',
                data: { error },
              });
              throw error;
            });
        }

        // Handle synchronous results
        instance.logLevel({
          functionName,
          level: finalOutputLevel,
          suffix: 'output',
          data: { result },
        });
        return result;
      } catch (error) {
        // Log error if synchronous method throws
        instance.logLevel({
          functionName,
          level: 'log',
          suffix: 'treatableError',
          data: { error },
        });
        throw error;
      }
    };

    return descriptor;
  };
}
