import jwt from "jsonwebtoken";
import fs from "fs/promises";

type AudienceIssuer = { audience: string; issuer: string };
type TokenPayload = { user_id: string } & jwt.JwtPayload;

// aes 256 cbc
export const createJwtToken = async (
	user_id: number,
	{ audience, issuer }: AudienceIssuer,
): Promise<string> => {
	const privateKey = await fs.readFile("./secrets/private.pem");

	return new Promise((resolve, reject) => {
		return jwt.sign(
			{
				user_id: user_id,
			},
			privateKey,
			{
				algorithm: "RS256",
				expiresIn: "2h",
				audience: audience,
				issuer: issuer,
			},
			(error, encoded) => {
				if (error || !encoded)
					return reject(error || new Error("No token encoded"));
				return resolve(encoded);
			},
		);
	});
};

export const verifyJwtToken = async (
	token: string,
	{ audience, issuer }: AudienceIssuer,
): Promise<TokenPayload> => {
	const privateKey = await fs.readFile("./secrets/private.pem");

	return new Promise((resolve, reject) => {
		jwt.verify(
			token,
			privateKey,
			{ algorithms: ["RS256"], audience: audience, issuer: issuer },
			(error, decoded) => {
				if (error || !decoded)
					return reject(error || new Error("No token decoded"));
				return resolve(decoded as TokenPayload);
			},
		);
	});
};

export const createJwtTokenForMicrositeClient = (user_id: number) => {
	return createJwtToken(user_id, {
		audience: "hdfcbank-microsite-client-1",
		issuer: "hdfcbank-microsite-clientservice",
	});
};

export const createJwtTokenForMicrositeAdmin = (user_id: number) => {
	return createJwtToken(user_id, {
		audience: "hdfcbank-microsite-admin-1",
		issuer: "hdfcbank-microsite-adminservice",
	});
};

export const verifyJwtTokenForMicrositeClient = async (
	access_token: string,
) => {
	return verifyJwtToken(access_token, {
		audience: "hdfcbank-microsite-client-1",
		issuer: "hdfcbank-microsite-clientservice",
	});
};

export const verifyJwtTokenForMicrositeAdmin = (access_token: string) => {
	return verifyJwtToken(access_token, {
		audience: "hdfcbank-microsite-admin-1",
		issuer: "hdfcbank-microsite-adminservice",
	});
};
