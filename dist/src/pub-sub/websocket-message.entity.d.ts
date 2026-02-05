import { z } from 'zod';
export declare const sendWebsocketMessageTopicName = "send-websocket-message";
declare const WebsocketMessageEntitySchema: z.ZodObject<{
    userId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    event: z.ZodString;
    data: z.ZodUnknown;
}, z.core.$strip>;
declare const WebsocketMessageEntity_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    userId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    event: z.ZodString;
    data: z.ZodUnknown;
}, z.core.$strip>> & {
    io: "input";
};
export declare class WebsocketMessageEntity extends WebsocketMessageEntity_base {
    static build(input: z.input<typeof WebsocketMessageEntitySchema>): WebsocketMessageEntity;
}
export {};
