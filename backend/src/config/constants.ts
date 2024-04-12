import { ServerDefaultConfig } from "./defaults";

export const contants = {
	PORT: +(process.env.PORT || ServerDefaultConfig.PORT),
	BASE_PATH: process.env.API_PATH || "/",
	ENABLE_OPENAPI: process.env.ENABLE_OPENAPI == "true",
	USE_SAME_OTP: process.env.USE_SAME_OTP == "true",
	ENABLE_HTTP_LOGGING: process.env.ENABLE_HTTP_LOGGING == "true",
	USE_CORS: process.env.USE_CORS == "true",
	USING_HTTPS: process.env.USING_HTTPS == "true",
	IMAGE_BASE_URL:
		process.env.IMAGE_BASE_URL ||
		"http://192.168.19.4:8001/microsite/admin-apis/file" ||
		ServerDefaultConfig.FILE_SERVICE_API,
};
