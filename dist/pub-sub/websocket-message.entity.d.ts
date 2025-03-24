import { z } from 'zod';
export declare const sendWebsocketMessageTopicName = "send-websocket-message";
declare const WebsocketMessageEntity_base: import("nestjs-zod").ZodDto<{
    userId: string;
    event: string;
    data?: unknown;
    organizationId?: string | null | undefined;
}, z.ZodObjectDef<{
    userId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    event: z.ZodString;
    data: z.ZodUnknown;
}, "strip", z.ZodTypeAny>, {
    userId: string;
    event: string;
    data?: unknown;
    organizationId?: string | null | undefined;
}>;
export declare class WebsocketMessageEntity extends WebsocketMessageEntity_base {
}
export {};
