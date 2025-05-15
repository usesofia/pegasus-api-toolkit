import { CreateFileUploadRequestDataEntitySchema } from '@app/files/entities/create-file-upload-request.entity';
import { channel } from '@app/utils/channel.utils';
import { createZodDto } from 'nestjs-zod';

const CreateFileUploadRequestBodyDtoSchema = CreateFileUploadRequestDataEntitySchema.extend({ channel }).omit({
  deletedAt: true,
});

export class CreateFileUploadRequestBodyDto extends createZodDto(CreateFileUploadRequestBodyDtoSchema) {}
