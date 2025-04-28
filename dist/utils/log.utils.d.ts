import { LogLevel } from '@nestjs/common';
import { Base } from '../base';
export declare function Log(level?: LogLevel, inputLevel?: LogLevel | undefined, outputLevel?: LogLevel | undefined): (target: Base, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
