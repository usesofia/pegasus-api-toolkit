import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { safeInstantiateEntity } from '../utils/entity.utils';

export const PageInfoEntitySchema = z.object({
  pageIndex: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
});

export class PageInfoEntity extends createZodDto(PageInfoEntitySchema) {
  static build(input: z.input<typeof PageInfoEntitySchema>): PageInfoEntity {
    return safeInstantiateEntity(PageInfoEntity, input);
  }
}
