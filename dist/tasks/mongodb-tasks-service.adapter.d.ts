import { Base } from "../base";
import { BaseConfigEntity } from "../config/base-config.entity";
import { TaskEntity } from "../tasks/task.entity";
import { TasksServicePort } from "../tasks/tasks-service.port";
import { LoggerService } from "@nestjs/common";
import { Connection } from "mongoose";
import { ClsService } from "nestjs-cls";
export declare class MongodbTasksServiceAdapter extends Base implements TasksServicePort {
    protected readonly baseConfig: BaseConfigEntity;
    protected readonly logger: LoggerService;
    protected readonly cls: ClsService;
    private readonly connection;
    private readonly taskModel;
    constructor(baseConfig: BaseConfigEntity, logger: LoggerService, cls: ClsService, connection: Connection);
    appendTask({ task, correlationId, }: {
        task: TaskEntity;
        correlationId?: string;
    }): Promise<void>;
}
