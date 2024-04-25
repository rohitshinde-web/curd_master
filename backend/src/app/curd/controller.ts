import { StatusCodes } from "http-status-codes";
import { knex_connection } from "../../knex";
import { logger } from "../../utils/logger";
import { RequestHandler } from "express";
import { ApplicationErrors, makeError } from "../../commons/errors";
import { accessorPaginationInfo } from "../middlewares/pagination";
import {parseJSON} from "../../utils/json";

export const getData: RequestHandler = async(req,res,next) => {
	try{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
		const current_page = +(req.query.current_page || "0");
		const per_page = +(req.query.per_page || "10");
        const pagination = accessorPaginationInfo(req).data;
	    const data = await knex_connection("customers").select("*").limit(per_page)
		.offset(current_page);;
	if(!data){
		return res.status(StatusCodes.NOT_FOUND).json(makeError(ApplicationErrors.UNEXPECTED_ERROR,"Data not found"))
	}
   await data.forEach(row =>{
		console.log(parseJSON(JSON.stringify(row.customers)))
	})
	return res.status(StatusCodes.OK).json({data,pagination:pagination})
	}catch(error){
		console.log('3')
		logger("curd").error(error);
		return res.status(StatusCodes.BAD_REQUEST).json(error)
	}
}

export const getDataById: RequestHandler = async (req,res,next) => {
	try {
     const customer_id = await req.params.customer_id;
    console.log('customer_id',customer_id)
	 const result = await knex_connection("customers").select("*").where({customer_id:customer_id}).first();
	 console.log('result',JSON.parse(JSON.stringify(result)))
	return res.status(200).json(result)
	}
	catch(err)
	{
       return res.status(404).send(err)
	}
}

export const addData: RequestHandler =async (req,res,next)=>{
	try{
	    console.log('body')
		const result = 	await knex_connection("customers").insert(req.body);
		if(!result){
		  return res.status(StatusCodes.BAD_REQUEST).json({error:"something wentWrorn"})
		}
		return res.status(201).json({message:"success"})
	}catch(error){
		console.log('3')
		logger("curd").error(error);
		return res.status(StatusCodes.BAD_REQUEST).json(error)
	}
	
}

export const updateData: RequestHandler = async (req,res,next) =>{
	try{
     const customer_id = await req.params.customer_id;
	 const result = await knex_connection("customers").update(req.body).where({customer_id:customer_id});
	 if(!result){
		return res.status(StatusCodes.BAD_REQUEST).json({error:"something wentWrorng"})
	 }
	 return res.status(StatusCodes.CREATED).json({message:'success'});
	}catch(error){
		console.log('3')
		logger("curd").error(error);
		return res.status(StatusCodes.BAD_REQUEST).json(error)
	}
}

export const deleteDataById: RequestHandler = async (req,res,next) =>{
	try{
		const customer_id = await req.params.customer_id;
		const result = await knex_connection("customers").delete().where({customer_id:customer_id});

		if(!result){
			return res.status(StatusCodes.BAD_REQUEST).json({error:"something wentWrorng"})
		}
		return res.status(StatusCodes.CREATED).json({message:'success'});
	}catch(error){
		console.log('3')
		logger("curd").error(error);
		return res.status(StatusCodes.BAD_REQUEST).json(error)
	}
}

