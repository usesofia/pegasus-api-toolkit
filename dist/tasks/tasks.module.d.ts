import { GcpTasksServiceAdapter } from '../tasks/gcp-tasks-service.adapter';
import { MongodbTasksServiceAdapter } from '../tasks/mongodb-tasks-service.adapter';
import { OnApplicationShutdown } from '@nestjs/common';
export declare class TasksModule implements OnApplicationShutdown {
    private readonly mongoDbTasksServiceAdapter;
    private readonly gcpTasksServiceAdapter;
    constructor(mongoDbTasksServiceAdapter: MongodbTasksServiceAdapter, gcpTasksServiceAdapter: GcpTasksServiceAdapter);
    onApplicationShutdown(): Promise<void>;
}
