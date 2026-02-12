import { Injectable, LoggerService } from "@nestjs/common";

@Injectable()
export class CliConsoleLoggerAdapter implements LoggerService {
	log(message: string, ...optionalParams: unknown[]) {
		console.log(message, ...optionalParams);
	}

	error(message: string, ...optionalParams: unknown[]) {
		console.error(message, ...optionalParams);
	}

	warn(message: string, ...optionalParams: unknown[]) {
		console.warn(message, ...optionalParams);
	}

	debug?() {
		// noop
	}

	verbose?(message: string, ...optionalParams: unknown[]) {
		console.info(message, ...optionalParams);
	}

	fatal?(message: string, ...optionalParams: unknown[]) {
		console.error(message, ...optionalParams);
	}

	setLogLevels?() {
		throw new Error("Not implemented.");
	}
}
