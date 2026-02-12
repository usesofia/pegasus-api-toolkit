import { z } from 'zod';
export declare const TaskEntitySchema: z.ZodObject<{
    queue: z.ZodString;
    microservice: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodAny>;
}, z.core.$strip>;
declare const TaskEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    queue: z.ZodString;
    microservice: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodAny>;
}, z.core.$strip>, false>;
export declare class TaskEntity extends TaskEntity_base {
}
export {};
