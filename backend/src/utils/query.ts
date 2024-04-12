import { AssertionError } from "assert";

export const stringArrayFromQuery = (
	queryValue: undefined | string | string[] | any,
): string[] => {
	if (!queryValue) return [];
	if (typeof queryValue === "string") {
		if (queryValue.includes(",")) {
			return queryValue.split(",");
		}
		return [queryValue];
	}
	if (Array.isArray(queryValue)) return queryValue;
	throw new AssertionError({
		message: `invalid queryValue '${queryValue}'`,
	});
};
