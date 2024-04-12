import cors from "cors";
import express from "express";
import * as http from "http";
import bodyParser from "body-parser";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { RunnerInterface } from "./config/runner";
import { getRoutes } from "./routes";
import { dependencies } from "./utils/dependencies";
import { getServerUrl } from "./utils/server_url";
import { log_routes } from "./utils/log_routes";
import { logger } from "./utils/logger";
import { AppRoutes } from "./config/routes_config";
import { contants } from "./config/constants";
import { errorHandler } from "./utils/error_handler";
import "express-async-errors";

export class ApiServer implements RunnerInterface {
	private server!: http.Server;

	log = logger("ApiServer");

	constructor(private readonly app: express.Application = express()) {
		this.server = http.createServer(app);
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json({ limit: "500kb" }));
		if (contants.USE_CORS) {
			this.app.use(cors());
		}
		if (contants.USING_HTTPS) {
			this.app.use(helmet());
		}
		if (contants.ENABLE_HTTP_LOGGING) {
			app.use(pinoHttp());
		}
		dependencies.server = this.server;
	}

	async start() {
		this.setupRoutes();
		this.startServer();
		this.log.info("Server setup completed");
	}

	async stop() {
		this.closeServer();
	}

	setupRoutes() {
		const router = express.Router();

		const routes = AppRoutes.createAppRoutesArrayFrom(getRoutes());
		for (const routeBuilder of routes) {
			const debugName = routeBuilder.debugName;
			try {
				routeBuilder.configure(router);
				this.log.info(`Routes configured for ${debugName}`);
			} catch (error) {
				this.log.error(error, `Failed to register route ${debugName}`);
			}
		}
		this.log.info(contants.BASE_PATH, "Using basepath");
		this.app.use(contants.BASE_PATH, router);

		this.app.use(errorHandler);
	}

	startServer() {
		this.server?.listen(contants.PORT, () => {
			this.log.info(`Server running at ${getServerUrl()}`);
			this.log.info(`Routes start with ${contants.BASE_PATH}`);
			if (process.env.DEBUG_ROUTES == "true") {
				log_routes(this.app);
			}
		});
	}

	async closeServer() {
		this.log.info("Closing server");
		return new Promise<void>((resolve) => {
			if (this.server) {
				this.server.close(() => {
					return resolve();
				});
			} else {
				return resolve();
			}
		});
	}
}
