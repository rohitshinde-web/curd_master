export const ensureJsonOf = <T>(data: any) => {
	if (typeof data === "string") {
		return JSON.parse(data) as T;
	}
	return data as T;
};
