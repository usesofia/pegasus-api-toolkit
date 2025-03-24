import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const sendWebsocketMessageTopicName = 'send-websocket-message';

const WebsocketMessageEntitySchema = z.object({
  userId: z.string(),
  organizationId: z.string().nullish(),
  event: z.string(),
  data: z.unknown(),
});

export class WebsocketMessageEntity extends createZodDto(
  WebsocketMessageEntitySchema,
) {}
