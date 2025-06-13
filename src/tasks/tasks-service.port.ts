import { TaskEntity } from '@app/tasks/task.entity';

export const TASKS_SERVICE_PORT = Symbol('TasksServicePort');

export interface TasksServicePort {
  appendTask({
    task,
    correlationId,
  }: {
    task: TaskEntity;
    correlationId?: string;
  }): Promise<void>;
  
  unsafeAppendTask({
    task,
  }: {
    task: TaskEntity;
  }): void;
  
  flushTasksBuffer({ max }: { max?: number }): Promise<void>;
  
  stopAutoFlushTasksBuffer(): Promise<void>;

  getQueueSize({ queueName }: { queueName: string }): Promise<number>;
}
