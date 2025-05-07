import { TasksServicePort } from '../tasks/tasks-service.port';
import { OnApplicationShutdown } from '@nestjs/common';
export declare class TasksModule implements OnApplicationShutdown {
    private readonly tasksService;
    constructor(tasksService: TasksServicePort);
    onApplicationShutdown(): Promise<void>;
}
