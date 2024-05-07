import { RequestHandler } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { knex_connection } from "../../knex";
import { StatusCodes } from "http-status-codes";
import knex from "knex";
import { ApplicationErrors, makeError } from "../../commons/errors";
import { logger } from "../../utils/logger";

const crypto = require('crypto');

const hashPassword = (password:any) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  };

export const signUp:RequestHandler = async(req,res,next) =>{
    try
    {
     const user = req.body;
     const {name,email,password} = user;
     const hashedPassword = hashPassword(password);
     const haxPassword = Buffer.from(hashedPassword,'utf-8').toString('hex');
     const isEmailAlreadyExit = await knex_connection('auth').select('*').where({email:email}).first();

     if(isEmailAlreadyExit){
        return res.status(StatusCodes.BAD_REQUEST).json("something went wrong");
     }

     const data = await knex_connection("auth").insert({name:name, email:email, password:haxPassword});
     if(!data){
        return res.status(StatusCodes.BAD_REQUEST).json("something went wrong");
     }
     return res.status(StatusCodes.CREATED).json(
        {
            status:StatusCodes.CREATED,
            success: true,
            message: 'user created successfully',
        }
      )
    }
    catch(error){
        console.log(error);
        // Send the error message to the client
         res.status(StatusCodes.BAD_REQUEST).json({
         status: 400,
         message: error,
         });
    }
}

export const signIn:RequestHandler = async(req,res,next) =>{
    try
    {
        const user = req.body;
        const {email,password} = user;

        const isUserExist = await knex_connection("auth").select("*").where({email:email}).first();
        if(!isUserExist){
            return res.status(StatusCodes.BAD_REQUEST).json(makeError(ApplicationErrors.USER_NOT_FOUND,'User Not Found'));
        }

        const dbPassword = await knex_connection("auth").select("*").where({email:email}).first();
        const hashedPasswordFromDB = dbPassword;
        const hashedInputPassword = hashPassword(password);
        const hexPassword = Buffer.from(hashedInputPassword,'utf-8').toString('hex');
        if(hexPassword !== hashedPasswordFromDB.password){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status:400,
                message:'Wrong Password',

            })
            
        }
        const token = jwt.sign(
            { id: isUserExist?.id, email: isUserExist?.email },
            "rohit_shinde",
            {
              expiresIn: "1d",
            }
          );
    
         return res.status(201).json({
            status: 200,
            success: true,
            message: "login success",
            token: token,
          })
    }
    catch(error){
        logger("error").error(error);
        // Send the error message to the client
         res.status(StatusCodes.BAD_REQUEST).json({
         status: 400,
         message: error,
         });
    }
}