import { RoutesBuilders } from "./config/routes_config";

import { Curd } from "./app/curd";
// import { MasterRoutes } from "./app/master";
// import { FilesRoutes } from "./app/files";
import { OpenApiRoutes } from "./app/openApi";
import { contants } from "./config/constants";
// import { PartnerRoutes } from "./app/partner";
// import { AuditRoutes } from "./app/audit";
// import { AdminUser } from "./app/admin_user";

export const getRoutes = (): RoutesBuilders => {
	const registeredRoutes: RoutesBuilders = {
		Curd,
		// PartnerRoutes: [PartnerRoutes, "/partner"],
		// MasterRoutes: [MasterRoutes, "/masters"],
		// FilesRoutes,
		// AuditRoutes,
		// AdminUser,
	};
	if (contants.ENABLE_OPENAPI) {
		registeredRoutes.OpenApiRoutes = OpenApiRoutes;
	}
	return registeredRoutes;
};
