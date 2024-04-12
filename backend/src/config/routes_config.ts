import express from "express";
import { logger } from "../utils/logger";
import assert from "assert";

export type RoutesBuilder = (router: express.Router) => void;
export type RoutesBuilderAndParentPath = [RoutesBuilder, string];
export type RoutesBuilders = {
	[routeDebugName: string]:
		| RoutesBuilder
		| AppRoutes
		| RoutesBuilderAndParentPath;
};

export class AppRoutes {
	constructor(
		protected readonly builder: RoutesBuilder,
		readonly debugName: string,
		readonly currentPath?: string,
	) {
		assert(builder, `Builder should not be undefined or null`);
	}

	configure(parentRouter: express.Router) {
		const log = logger("AppRoutes.configure");
		const router = express.Router();
		log.debug(this.debugName, "Building routes");

		this.builder(router);
		log.debug(this.debugName, "Built routes");
		log.debug(this.debugName, `Attaching to parent router`);
		const path = this.currentPath;
		if (path) {
			log.debug(this.debugName, `Adding base path ${path}`);
			parentRouter.use(path, router);
		} else {
			parentRouter.use(router);
		}
	}

	static createAppRoutesArrayFrom(routes: RoutesBuilders): AppRoutes[] {
		const log = logger("AppRoutes.createAppRoutesArrayFrom");
		const appRoutes: AppRoutes[] = [];
		for (const routeInfo of Object.entries(routes)) {
			const routeInfoValue = routeInfo[1];
			if (routeInfoValue instanceof AppRoutes) {
				appRoutes.push(routeInfoValue);
				continue;
			}
			const routeName = routeInfo[0];
			if (routeInfoValue instanceof Array) {
				const builder = routeInfoValue[0];
				const parentPath = routeInfoValue[1];
				log.debug({ builder, routeName, parentPath, routeInfoValue });
				appRoutes.push(new AppRoutes(builder, routeName, parentPath));
				continue;
			}
			if (routeInfoValue instanceof Function) {
				const builder = routeInfoValue;
				appRoutes.push(new AppRoutes(builder, routeName));
				continue;
			}
		}
		return appRoutes;
	}
}
