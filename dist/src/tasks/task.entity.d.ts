import { z } from 'zod';
export declare const TaskEntitySchema: z.ZodObject<{
    queue: z.ZodString;
    microservice: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    queue: string;
    payload: Record<string, any>;
    microservice: string;
}, {
    queue: string;
    payload: Record<string, any>;
    microservice: string;
}>;
declare const TaskEntity_base: import("nestjs-zod").ZodDto<{
    queue: string;
    payload: Record<string, any>;
    microservice: string;
}, z.ZodObjectDef<{
    queue: z.ZodString;
    microservice: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny>, {
    queue: string;
    payload: Record<string, any>;
    microservice: string;
}>;
export declare class TaskEntity extends TaskEntity_base {
}
export {};
