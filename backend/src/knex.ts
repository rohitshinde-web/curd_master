import "dotenv/config";
import * as _knex from "knex";
import { attachPaginate } from "knex-paginate";

export const knex_connection = _knex.default({
	client: "postgres",
	connection: {
		host:"localhost",
		port:5432,
		user: "postgres",
		password: "Rohit@123",
		database: "curd",
		ssl: false,
	},
	pool: { min: 0, max: 7 },
	acquireConnectionTimeout: 10000,
});

attachPaginate();