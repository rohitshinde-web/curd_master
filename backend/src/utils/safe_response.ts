import express from "express";

import { ApplicationErrors, makeError } from "../commons/errors";
import { logger } from "./logger";

const log = logger("safeResponse");

export const safeResponse = (handler: any) => {
	return async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			return await handler(req, res, next);
		} catch (err) {
			log.error({ error: err });
			return res
				.status(500)
				.json(makeError(ApplicationErrors.UNEXPECTED_ERROR));
		}
	};
};
