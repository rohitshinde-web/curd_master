export namespace PageUtil {
	export type PaginationInfo = {
		current_page : number;
		per_page: number;
		total_count: number;
		total_pages: number;
	}

	export const calculatePageCount = (totalCount:number, perPage: number) =>{
		if(totalCount < 1) return 0;
		if(perPage < 1) return 0;

		return Math.ceil(totalCount / perPage);
	}
}
