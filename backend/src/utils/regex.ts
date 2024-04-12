import Joi from "joi";

export const humanNameRegex = /^[A-Za-z\s]{0,}$/;
export const organizationNameRegex = /^[A-Za-z\s]{1,}[.]{0,1}[A-Za-z\s]{0,}$/;
export const domainNameRegex =
	/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
export const websiteUrlRegex =
	/^((https):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
