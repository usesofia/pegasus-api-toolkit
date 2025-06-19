import { z } from 'zod';
declare const RemoveFileRequestEntitySchema: z.ZodObject<{
    id: z.ZodString;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, {
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
declare const RemoveFileRequestEntity_base: import("nestjs-zod").ZodDto<{
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}, z.ZodObjectDef<{
    id: z.ZodString;
    channel: z.ZodNativeEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, "strip", z.ZodTypeAny>, {
    id: string;
    channel: "WEB_APP" | "WHATSAPP" | "SYSTEM" | "EMAIL";
}>;
export declare class RemoveFileRequestEntity extends RemoveFileRequestEntity_base {
    static build(input: z.input<typeof RemoveFileRequestEntitySchema>): RemoveFileRequestEntity;
}
export {};
