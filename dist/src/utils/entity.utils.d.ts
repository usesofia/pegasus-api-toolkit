import { ZodDto } from 'nestjs-zod';
export declare function safeInstantiateEntity<T extends ZodDto>(entityClass: T, input: any): InstanceType<T>;
export declare function unsafeInstantiateEntity<T extends ZodDto>(entityClass: T, input: any): InstanceType<T>;
