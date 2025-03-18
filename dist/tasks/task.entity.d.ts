import { z } from 'zod';
export declare const TaskEntitySchema: z.ZodObject<{
    queue: z.ZodString;
    microservice: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    payload: Record<string, any>;
    queue: string;
    microservice: string;
}, {
    payload: Record<string, any>;
    queue: string;
    microservice: string;
}>;
declare const TaskEntity_base: import("nestjs-zod").ZodDto<{
    payload: Record<string, any>;
    queue: string;
    microservice: string;
}, z.ZodObjectDef<{
    queue: z.ZodString;
    microservice: z.ZodString;
    payload: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny>, {
    payload: Record<string, any>;
    queue: string;
    microservice: string;
}>;
export declare class TaskEntity extends TaskEntity_base {
}
export {};
