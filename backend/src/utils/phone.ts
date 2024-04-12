import * as libphone from "libphonenumber-js";
import { logger } from "./logger";

export const isPhoneNumberValid = (
	phoneString: string,
	defaultCountry: libphone.CountryCode,
): string | null => {
	const log = logger("isPhoneNumberValid");
	try {
		const isValid = libphone.isValidNumberForRegion(
			phoneString,
			defaultCountry,
		);
		if (isValid) {
			return null;
		}
	} catch (error) {
		log.error(`failed to validate phone number ${phoneString}`, error);
	}
	return "Please make sure you use a valid phone number";
};
