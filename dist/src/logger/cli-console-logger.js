"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliConsoleLoggerAdapter = void 0;
const common_1 = require("@nestjs/common");
let CliConsoleLoggerAdapter = class CliConsoleLoggerAdapter {
    log(message, ...optionalParams) {
        console.log(message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        console.error(message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        console.warn(message, ...optionalParams);
    }
    debug() {
    }
    verbose(message, ...optionalParams) {
        console.info(message, ...optionalParams);
    }
    fatal(message, ...optionalParams) {
        console.error(message, ...optionalParams);
    }
    setLogLevels() {
        throw new Error("Not implemented.");
    }
};
exports.CliConsoleLoggerAdapter = CliConsoleLoggerAdapter;
exports.CliConsoleLoggerAdapter = CliConsoleLoggerAdapter = __decorate([
    (0, common_1.Injectable)()
], CliConsoleLoggerAdapter);
//# sourceMappingURL=cli-console-logger.js.map