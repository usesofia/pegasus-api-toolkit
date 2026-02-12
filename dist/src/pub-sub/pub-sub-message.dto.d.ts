import { ZodDto } from 'nestjs-zod';
import { z } from 'zod';
declare const PubSubMessageBodyDto_base: ZodDto<z.ZodObject<{
    message: z.ZodObject<{
        data: z.ZodString;
        messageId: z.ZodString;
        publishTime: z.ZodString;
    }, z.core.$strip>;
    subscription: z.ZodString;
}, z.core.$strip>, false>;
export declare class PubSubMessageBodyDto extends PubSubMessageBodyDto_base {
    extractPayload<T extends ZodDto<any>>(entityClass: T): InstanceType<T>;
}
export {};
