import { z } from 'zod';
declare const RemoveFileRequestBodyDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    channel: z.ZodEnum<{
        readonly WEB_APP: "WEB_APP";
        readonly WHATSAPP: "WHATSAPP";
        readonly SYSTEM: "SYSTEM";
        readonly EMAIL: "EMAIL";
    }>;
}, z.core.$strip>> & {
    io: "input";
};
export declare class RemoveFileRequestBodyDto extends RemoveFileRequestBodyDto_base {
}
export {};
