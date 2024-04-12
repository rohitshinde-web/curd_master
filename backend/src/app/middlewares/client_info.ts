import {RequestHandler, Request} from "express";

export interface ClientInfo {
    origin: string | null;
    user_agent: string | null;
    http_version: string | null;
    ip: string | null;
    ips: string[];
}

export const getClientInfoFromRequest = (req:Request): ClientInfo | null =>{
   const client_info = (req as any).client_info;
   if(client_info) return client_info as ClientInfo;
   return null; 
}

const setClientInfoInRequest = (req: Request, info: ClientInfo) => {
	(req as any).client_info = info;
};

export const clientInfoMiddleware: RequestHandler = (req, res, next) => {
	setClientInfoInRequest(req, {
		origin: req.headers.origin || null,
		user_agent: req.headers["user-agent"] || null,
		http_version: req.httpVersion || null,
		ip: req.ip || null,
		ips: req.ips,
	});
	res.locals;
	return next();
};
