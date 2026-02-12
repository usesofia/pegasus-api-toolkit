import { z } from 'zod';
declare const RemoveFileRequestEntitySchema: z.ZodObject<{
    id: z.ZodString;
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>;
declare const RemoveFileRequestEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    id: z.ZodString;
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>, false>;
export declare class RemoveFileRequestEntity extends RemoveFileRequestEntity_base {
    static build(input: z.input<typeof RemoveFileRequestEntitySchema>): RemoveFileRequestEntity;
}
export {};
