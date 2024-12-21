import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PageQueryEntitySchema = z.object({
  pageIndex: z
    .preprocess((val) => Number(val), z.number())
    .optional()
    .default(0),
  pageSize: z
    .preprocess((val) => Number(val), z.number())
    .optional()
    .default(100),
});

export class PageQueryEntity extends createZodDto(PageQueryEntitySchema) {}
