
import { AssertionError } from "assert";
import express from "express";

export interface DataAccessor<T> {
	get data(): T | null;
	set data(value: T);
}

export type Accessor<INPUT_TYPE, RETURN_TYPE> = (
	request: INPUT_TYPE,
) => DataAccessor<RETURN_TYPE>;

const ensureIsTypeRecord = <VALUE_TYPE>(
	o: any,
): o is Record<string, VALUE_TYPE> => {
	return typeof o === "object";
};

const dataAccessorFrom = <INPUT_TYPE, RETURN_TYPE>(
	key_name: string,
): Accessor<INPUT_TYPE, RETURN_TYPE> => {
	return (request: INPUT_TYPE): DataAccessor<RETURN_TYPE> => {
		const record = request as any;

		return {
			get data(): RETURN_TYPE | null {
				if (!ensureIsTypeRecord<RETURN_TYPE>(record)) {
					return null;
				}
				return record[key_name] || null;
			},
			set data(value: RETURN_TYPE) {
				if (!ensureIsTypeRecord<RETURN_TYPE>(value)) {
					throw new AssertionError({
						message: `Data cannot be set to ${value}`,
						expected: "object",
						actual: typeof value,
					});
				}
				record[key_name] = value;
			},
		};
	};
};

export type RequestDataAccessor<RETURN_TYPE> = Accessor<
	express.Request,
	RETURN_TYPE
>;
export const requestDataAccessor = <RETURN_TYPE>(
	key_name: string,
): RequestDataAccessor<RETURN_TYPE> => {
	return dataAccessorFrom(key_name);
};
