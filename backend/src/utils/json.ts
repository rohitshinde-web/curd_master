export const parseJSON = (data: string | object | any) => {
	try {
		if (typeof data === "string") {
			return JSON.parse(data);
		}
	} catch (error) {
		console.log({
			error,
			message: "Failed to try parse json",
		});
	}
	return data;
};
