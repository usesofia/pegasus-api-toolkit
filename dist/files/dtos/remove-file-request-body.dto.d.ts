import { z } from 'zod';
declare const RemoveFileRequestBodyDto_base: import("nestjs-zod").ZodDto<{
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM";
}, z.ZodObjectDef<{
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
    }>;
}, "strip", z.ZodTypeAny>, {
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM";
}>;
export declare class RemoveFileRequestBodyDto extends RemoveFileRequestBodyDto_base {
}
export {};
