import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PopulateRequestQueryDtoSchema = z.object({
  populate: z.string().optional(),
});

export class PopulateRequestQueryDto extends createZodDto(
  PopulateRequestQueryDtoSchema,
) {}
