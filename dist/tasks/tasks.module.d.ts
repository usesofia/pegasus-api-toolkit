import { TasksServicePort } from '../tasks/tasks-service.port';
export declare class TasksModule {
    private readonly tasksService;
    constructor(tasksService: TasksServicePort);
    onApplicationShutdown(): Promise<void>;
}
