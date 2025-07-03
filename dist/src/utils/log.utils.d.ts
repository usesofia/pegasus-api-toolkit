import { LogLevel } from '@nestjs/common';
import { Base } from '../base';
export declare function Log(level?: LogLevel | 'controller'): (target: Base, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
