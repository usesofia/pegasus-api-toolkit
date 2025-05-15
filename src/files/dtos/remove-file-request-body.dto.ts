import { channel } from '@app/utils/channel.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RemoveFileRequestBodyDtoSchema = z.object({
  channel,
});

export class RemoveFileRequestBodyDto extends createZodDto(RemoveFileRequestBodyDtoSchema) {}
