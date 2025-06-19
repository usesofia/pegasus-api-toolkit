import { z } from 'zod';
declare const RemoveFileRequestBodyDto_base: import("nestjs-zod").ZodDto<{
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, z.ZodObjectDef<{
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny>, {
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
export declare class RemoveFileRequestBodyDto extends RemoveFileRequestBodyDto_base {
}
export {};
