import { ZodDto } from 'nestjs-zod';
import { z } from 'zod';
declare const PubSubMessageBodyDto_base: ZodDto<{
    message: {
        data: string;
        messageId: string;
        publishTime: string;
    };
    subscription: string;
}, z.ZodObjectDef<{
    message: z.ZodObject<{
        data: z.ZodString;
        messageId: z.ZodString;
        publishTime: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data: string;
        messageId: string;
        publishTime: string;
    }, {
        data: string;
        messageId: string;
        publishTime: string;
    }>;
    subscription: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    message: {
        data: string;
        messageId: string;
        publishTime: string;
    };
    subscription: string;
}>;
export declare class PubSubMessageBodyDto extends PubSubMessageBodyDto_base {
    extractPayload<T extends ZodDto>(entityClass: T): InstanceType<T>;
}
export {};
