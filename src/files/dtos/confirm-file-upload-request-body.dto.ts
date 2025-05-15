import { ConfirmFileUploadRequestDataEntitySchema } from '@app/files/entities/confirm-file-upload-request.entity';
import { FileStatus } from '@app/files/entities/file.entity';
import { channel } from '@app/utils/channel.utils';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ConfirmFileUploadRequestBodyDtoSchema = ConfirmFileUploadRequestDataEntitySchema.extend({
  status: z.enum([FileStatus.FAILED, FileStatus.COMPLETED]),
  channel,
});

export class ConfirmFileUploadRequestBodyDto extends createZodDto(ConfirmFileUploadRequestBodyDtoSchema) {}
