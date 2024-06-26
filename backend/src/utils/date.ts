export const addMinutes = (date: Date, minutes: number) => {
	return new Date(date.getTime() + minutes * 60000);
};

export const addHours = (date: Date, hours: number) => {
	return new Date(date.getTime() + hours * 60 * 60000);
};
