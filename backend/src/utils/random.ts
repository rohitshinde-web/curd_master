import { AssertionError } from "assert";
import { randomUUID, randomBytes, getRandomValues } from "crypto";

export const makeUID = (): string => {
	return randomUUID();
};

export const makeSessionToken = (): string => {
	return randomBytes(16).toString("base64");
};

const cryptoRandom = () => {
	return getRandomValues(new Uint32Array(1))[0] / 0x100000000;
};

export const randomString = (length: number, chars: string) => {
	var mask = "";
	if (chars.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
	if (chars.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	if (chars.indexOf("#") > -1) mask += "0123456789";
	if (chars.indexOf("!") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
	var result = "";
	for (var i = length; i > 0; --i)
		result += mask[Math.floor(cryptoRandom() * mask.length)];
	return result;
};

export const randomAlphaNumeric = (length: number) =>
	randomString(length, "A#");
export const randomNumeric = (length: number) => randomString(length, "#");
