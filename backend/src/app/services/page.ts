import { knex_connection } from "../../knex";
import { PageUtil } from "../../utils/page";
import { KnownContentTable } from "./audit_trail";

export const getPaginationInfoFor = async (
	table_name: KnownContentTable | "audit_trail",
	{
		current_page_num,
		per_page_num,
	}: {
		current_page_num: number;
		per_page_num: number;
	},
): Promise<PageUtil.PaginationInfo> => {
	const [{ total }] = await knex_connection(table_name).count("* as total");
	const total_count = parseInt(total.toString());

	return {
		current_page: current_page_num,
		per_page: per_page_num,
		total_count,
		total_pages: PageUtil.calculatePageCount(total_count, per_page_num),
	};
};
