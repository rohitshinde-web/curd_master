import { contants } from "../config/constants";
import { dependencies } from "./dependencies";
import { AddressInfo } from "net";

export const getServerIPUrl = (): string => {
	const addressInfo = dependencies.server!.address() as AddressInfo;
	const address =
		addressInfo.address === "::" ? "192.168.19.4" : addressInfo.address;
	const url = `http://${address}:${addressInfo.port}`;
	return url;
};

export const getHdfcAdminServerUrl = (): string => {
	return "https://microsite.hdfc.com";
};

export const getServerUrl = (): string => {
	const addressInfo = dependencies.server!.address() as AddressInfo;
	const address =
		addressInfo.address === "::" ? "localhost" : addressInfo.address;
	const url = `http://${address}:${addressInfo.port}`;
	return url;
};

export const getServerBasePath = () => {
	return contants.BASE_PATH;
};
