import { RoutesBuilder } from "../../config/routes_config";

import * as controllers from "./controllers";

export const OpenApiRoutes: RoutesBuilder = (router) => {
	router.use(
		"/api-docs",
		controllers.openApiMiddleware,
		controllers.openApiDocumentLazyHandler,
	);
	router.get("/api-docs.json", controllers.getOpenApiDocumentJson);
};