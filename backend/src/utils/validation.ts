import Joi from "joi";
import { isPhoneNumberValid } from "./phone";
import { DateTime } from "luxon";

export const isMoreThan18YearsOldDate: Joi.CustomValidator = (
	value,
	helper,
) => {
	const yearsAgo18 = DateTime.now().minus({ years: 18 });
	const it = DateTime.fromJSDate(value);
	if (it > yearsAgo18) {
		return helper.message("Please make sure you use a real birth date" as any);
	}
	return value;
};

export const isPhoneNumberValidIN: Joi.CustomValidator = (value, helper) => {
	const validation = isPhoneNumberValid(value, "IN");
	if (!validation) return value;
	return helper.message(validation as any);
};
