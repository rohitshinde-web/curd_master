import { Request, Response, NextFunction } from "express";
// import { ApplicationThrowableError } from "../commons/errors";

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log("handled error", err);
	// if (err instanceof ApplicationThrowableError) {
	// 	return res.status(err.status_code).json(err.error);
	// }

	console.error(err);
	return res.status(400).send({
		errors: [{ message: "Something went wrong" }],
	});
};
