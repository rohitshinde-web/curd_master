import { StatusCodes } from "http-status-codes";

export enum ApplicationErrors {
	INVALID_CREDENTIALS,
	SESSION_EXPIRED,
	UNEXPECTED_ERROR,
	VALIDATION_ERROR,
	QUERY_PARAMS_VALIDATION_ERROR,
	INVALID_AUTHENTICATION,
	NOT_ALLOWED,
	NOT_FOUND,
	USER_ALREADY_EXISTS,
	NO_SUCH_AUTH_VERIFICATION_ERROR,
	AUTH_VERIFICATION_ERROR,
	USER_NOT_FOUND,
	NO_FILE_ATTACHED,
	APPLICANT_ID_NOT_FOUND,
	FILE_NOT_FOUND,
	USER_CREATION_FAILED,
	FILE_UNAVAILABLE,
	ACCOUNT_DISABLED,
	UNKNOWN_TABLE_NAME,
}

export type ApplicationErrorResponse = {
	error_code: string;
	error_message?: string;
	[field: string]: any | undefined;
};

export class ApplicationThrowableError extends Error {
	constructor(
		readonly status_code: StatusCodes,
		readonly error: ApplicationErrorResponse,
	) {
		super(
			`ApplicationThrowableError: Error with status code ${status_code}, error code ${error.error_code} and message ${error.error_message}`,
		);
	}

	static make = (
		status_code: StatusCodes,
		error: ApplicationErrors,
		error_message?: string,
		...others: { [field: string]: any }[]
	) => {
		return new ApplicationThrowableError(
			status_code,
			makeError(error, error_message, ...others),
		);
	};
}

export const makeError = (
	error: ApplicationErrors,
	error_message?: any,
	...others: { [field: string]: any }[]
): ApplicationErrorResponse => {
	return {
		error_code: ApplicationErrors[error],
		error_message,
		...others,
	};
};
