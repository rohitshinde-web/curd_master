import { RequestHandler } from "express";
import { ApplicationErrors, makeError } from "../../commons/errors";
import { StatusCodes } from "http-status-codes";
import { logger } from "../../utils/logger";
import { KnownContentTable } from "../services/audit_trail";
import { getPaginationInfoFor } from "../services/page";
import { requestDataAccessor } from "./accessor";
import { PageUtil } from "../../utils/page";

export const accessorPaginationInfo =
	requestDataAccessor<PageUtil.PaginationInfo>("pagination_info");

export const validationPaginationParams =
	(table_name: KnownContentTable | "audit_trail"): RequestHandler =>
	async (req, res, next) => {
		const log = logger("validationPaginationParams");
		try {
			let { per_page, current_page } = req.query;
			if (!per_page) {
				per_page = "10";
			}
			if (!current_page) {
				current_page = "0";
			}
			if (
				!per_page ||
				!current_page ||
				typeof per_page !== "string" ||
				typeof current_page !== "string"
			) {
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json(
						makeError(
							ApplicationErrors.VALIDATION_ERROR,
							`Invalid "current_page" or "per_page"`,
						),
					);
			}

			const per_page_num = Number.parseInt(per_page);
			const current_page_num = Number.parseInt(current_page);
			if (per_page_num < 1)
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json(
						makeError(
							ApplicationErrors.VALIDATION_ERROR,
							`"per_page" cannot be less than 1`,
						),
					);
			if (current_page_num < 0)
				return res
					.status(StatusCodes.BAD_REQUEST)
					.json(
						makeError(
							ApplicationErrors.VALIDATION_ERROR,
							`"current_page" cannot be less than 0`,
						),
					);

			const pagination = await getPaginationInfoFor(table_name, {
				current_page_num,
				per_page_num,
			});

			if (!pagination.total_pages || pagination.total_pages < 1) {
				return {
					data: [],
					pagination: pagination,
				};
			}
			accessorPaginationInfo(req).data = pagination;
			return next();
		} catch (error) {
			log.error(error);
		}
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json(makeError(ApplicationErrors.VALIDATION_ERROR));
	};
