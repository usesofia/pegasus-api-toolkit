import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const TaskEntitySchema = z.object({
  queue: z.string(),
  microservice: z.string(),
  payload: z.record(z.string(), z.any()),
});

export class TaskEntity extends createZodDto(TaskEntitySchema) {}
