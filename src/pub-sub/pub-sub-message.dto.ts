import { createZodDto, ZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { safeInstantiateEntity } from '../utils/entity.utils';

const PubSubMessageBodyDtoSchema = z.object({
  message: z.object({
    data: z.string(), // base64 encoded string
    messageId: z.string(),
    publishTime: z.string(),
  }),
  subscription: z.string(),
});

export class PubSubMessageBodyDto extends createZodDto(
  PubSubMessageBodyDtoSchema,
) {
  extractPayload<T extends ZodDto>(entityClass: T): InstanceType<T> {
    const decodedData = Buffer.from(this.message.data, 'base64').toString();
    const parsedData = JSON.parse(decodedData);
    return safeInstantiateEntity(entityClass, parsedData);
  }
}
