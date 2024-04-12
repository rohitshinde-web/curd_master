import { knex_connection } from "../../knex";
import { logger } from "../../utils/logger";

import configJson from "../../../config.json";
import { ClientInfo } from "../../app/middlewares/client_info";

export const getPrimaryKeyNameBy = (table_name: string): string | null => {
	const resources: { [table_name: string]: string[] } = configJson.resources;
	const primaryKey = resources[table_name];
	if (primaryKey && primaryKey.length) return primaryKey[0];
	return null;
};

export const isKnownContentTable = (
	table_name: string,
): table_name is KnownContentTable => {
	return !!getPrimaryKeyNameBy(table_name);
};

export const addToAuditTrail = async (
	table_name: KnownContentTable,
	username: string,
	data: object,
	old_data?: object,
	table_key?: string,
	client_info?: ClientInfo | null,
) => {
	logger("addToAuditTrail").info(data);
	const dto = {
		table_name: table_name,
		data_id: data,
		old_data: old_data,
		status: "pending",
		status_by: username,
		status_date: new Date(),
		created_by: username,
		created_date: new Date(),
		created_info: client_info,
	};
	if (table_key) {
		(dto as any).table_key = table_key;
	}
	await knex_connection("audit_trail").insert(dto);
};

export type KnownContentTable =
      "customers"
	| "partner_master"
	| "partner_offers"
	| "partner_emp_list"
	| "microsite_master"
	| "consent";
export type StatusTypes = "pending" | "approved" | "rejected";

export const getCustomerData = async (
	table: KnownContentTable,
	table_name: KnownContentTable,
) => {
	await knex_connection(table)
		.select({ table_name })
		.where({
			table_name: table_name,
		})
		.first();
};