import pino from "pino";

const _pino = pino();

export const logger = (name?: string) => {
	return _pino.child({ module: name || "app" });
};

export const logPromiseReject = async <T>(
	onLog: (e: unknown) => void,
	promise: Promise<T>,
	fallback?: () => T,
) => {
	try {
		return await promise;
	} catch (e) {
		onLog(e);
		return fallback && fallback();
	}
};
