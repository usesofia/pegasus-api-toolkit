import { z } from 'zod';
declare const RemoveFileRequestEntitySchema: z.ZodObject<{
    id: z.ZodString;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM";
}, {
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM";
}>;
declare const RemoveFileRequestEntity_base: import("nestjs-zod").ZodDto<{
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM";
}, z.ZodObjectDef<{
    id: z.ZodString;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
    }>;
}, "strip", z.ZodTypeAny>, {
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM";
}>;
export declare class RemoveFileRequestEntity extends RemoveFileRequestEntity_base {
    static build(input: z.input<typeof RemoveFileRequestEntitySchema>): RemoveFileRequestEntity;
}
export {};
