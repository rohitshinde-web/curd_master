import * as http from "http";
import { OperationStartupShutdown } from "../config/operation";

export type GlobalDependencies = {
	server?: http.Server;
	operations?: OperationStartupShutdown;
};

export const dependencies: GlobalDependencies = {};
