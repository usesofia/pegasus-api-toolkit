import { safeInstantiateEntity } from "@app/utils/entity.utils";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const JobRequestPayloadEntitySchema = z.object({
  jobRequestId: z.string(),
});

export class JobRequestPayloadEntity extends createZodDto(JobRequestPayloadEntitySchema) {
  static build(input: z.infer<typeof JobRequestPayloadEntitySchema>) {
    return safeInstantiateEntity(JobRequestPayloadEntity, input);
  }
}
