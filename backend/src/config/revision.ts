import * as child_process from "child_process";
import { logger } from "../utils/logger";

export const getRevision = async (): Promise<string> => {
	const log = logger("getRevision");
	try {
		return await new Promise<string>((resolve, reject) => {
			return child_process.exec(
				"git rev-parse HEAD",
				(error, stdout, stderr) => {
					const err = error || stderr;
					if (err) {
						log.error(error, "error");
						log.error(stderr, "stderr");
						return reject(err);
					}
					const revision = stdout.toString().trim();
					return resolve(revision);
				},
			);
		});
	} catch (e) {
		return "";
	}
};
