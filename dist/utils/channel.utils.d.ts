import { z } from "zod";
export declare const CHANNEL_TYPES: {
    readonly WEB_APP: "WEB_APP";
    readonly WHATSAPP: "WHATSAPP";
};
export type ChannelType = keyof typeof CHANNEL_TYPES;
export declare const channel: z.ZodNativeEnum<{
    readonly WEB_APP: "WEB_APP";
    readonly WHATSAPP: "WHATSAPP";
}>;
