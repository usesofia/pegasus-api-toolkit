import { TaskEntity } from '../tasks/task.entity';
export declare const TASKS_SERVICE_PORT: unique symbol;
export interface TasksServicePort {
    appendTask({ task, correlationId, }: {
        task: TaskEntity;
        correlationId?: string;
    }): Promise<void>;
    unsafeAppendTask({ task, }: {
        task: TaskEntity;
    }): void;
    flushTasksBuffer({ max }: {
        max?: number;
    }): Promise<void>;
    stopAutoFlushTasksBuffer(): Promise<void>;
}
