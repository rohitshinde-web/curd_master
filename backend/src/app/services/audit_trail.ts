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

export const getAuditTrail = async (
	table: KnownContentTable,
	table_name: KnownContentTable,
	status: StatusTypes,
) => {
	await knex_connection(table)
		.select({ table_name, status })
		.where({
			table_name: table_name,
			status: status,
		})
		.first();
};



export const updateAuditTrail = async (
	table: KnownContentTable,
	auditTrailId: string,
	username: string,
	data: object,
) => {
	const log = logger("updateAuditTrail");
	const oldData = await knex_connection(table)
		.select<{ data_id: string; status: StatusTypes; status_date: Date | null }>(
			"",
			"status_date",
			"data_id",
		)
		.where({ id: auditTrailId })
		.first();

	log.info({ oldData });

	let status_date;
	let status_by;

	if (oldData && oldData.status != "pending") {
		status_by = username;
		status_date = new Date();
	}
	return await knex_connection("audit_trail")
		.update({
			table_name: table,
			data_id: data,
			old_data: oldData && oldData.data_id,
			status: "pending",
			status_by: status_by,
			status_date,
			updated_by: username,
			updated_date: new Date(),
		})
		.where({ id: auditTrailId });
};

export const setAuditTrailStatus = async (
	id: string,
	username: string,
	status: StatusTypes,
	status_reason: string,
) => {
	return await knex_connection("audit_trail")
		.update({
			status,
			status_date: new Date(),
		})
		.where({
			id: id,
		})
		.returning("table_key");
};