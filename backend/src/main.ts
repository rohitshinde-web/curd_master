import "dotenv/config";
import { OperationStartupShutdown } from "./config/operation";
import { RunnerInterface } from "./config/runner";
import { ApiServer } from "./server";
import { dependencies } from "./utils/dependencies";
import "express-async-errors";

const main = async (): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const operation = new OperationStartupShutdown();

		dependencies.operations = operation;

		const runners: RunnerInterface[] = [operation, new ApiServer()];

		Promise.all(runners.map((it) => it.start()))
			.then(() => resolve())
			.catch(reject);

		const graceful = () => {
			Promise.all(runners.map((it) => it.stop())).then(() => process.exit(0));
		};

		// Stop graceful
		process.on("SIGTERM", graceful);
		process.on("SIGINT", graceful);
	});
};

main();
