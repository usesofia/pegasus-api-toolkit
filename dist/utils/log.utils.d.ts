import { LogLevel } from '@nestjs/common';
import { Base } from '../base';
export declare function Log(level?: LogLevel): (target: Base, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
