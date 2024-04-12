import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import {
	getHdfcAdminServerUrl,
	getServerBasePath,
	getServerIPUrl,
	getServerUrl,
} from "../../utils/server_url";
import { RequestHandler } from "express";
// import packageJson from "../../../package.json";

let openapiSpecification: object;

const getOpenApiSpecification = () => {
	if (!openapiSpecification) {
		openapiSpecification = swaggerJsdoc({
			failOnErrors: true,
			definition: {
				openapi: "3.0.3",
				info: {
					title: "BaaS Microsite Admin - OpenAPI",
					version: "3.0.3",
					contact: {
						email: "edgar.raj@hdfcbank.com",
					},
					description:
						"The BaaS MicroSite Admin API Documentation Project is an essential resource for developers aiming to integrate the MicroSite backend service into their applications. Utilizing the OpenAPI Specification (OAS 3.0), this documentation ensures clarity, consistency, and ease of use for developers at all levels.\n\nThis project aims to deliver a robust and flexible API architecture that facilitates seamless interactions with different aspects of the business management system. It empowers users to efficiently manage partnerships, monitor system health, and gain valuable insights through auditing mechanisms. The modular design allows for scalability and adaptability to evolving business needs.",
					license: {
						name: "HDFC Bank Ltd",
						url: "https://www.hdfcbank.com",
					},
					termsOfService:
						"https://www.hdfcbank.com/personal/useful-links/terms-and-conditions",
					privacyPolicy:
						"https://www.hdfcbank.com/personal/useful-links/privacy",
				},
				servers: [
					{
						url: getServerUrl() + getServerBasePath(),
					},
					{
						url: getServerIPUrl() + getServerBasePath(),
					},
					{
						url: getHdfcAdminServerUrl() + getServerBasePath(),
					},
				],
				tags: [
					{
						name: "curd",
						description:
							"The Health API provides a straightforward health check endpoint, allowing monitoring systems to assess the system's well-being.",
					},
					{
						name: "Dashboard API",
						description:
							"API for managing dashboard data including counts for approved, rejected, pending and new requests.",
					},
					{
						name: "Partner Master API",
						description:
							"The Partner Master API focuses on managing partner master data.",
					},
					{
						name: "Partner Employee List API",
						description:
							"This API module is designed for handling partner employee lists, providing endpoints for managing employee data associated with partners.",
					},
					{
						name: "Partner Offers API",
						description:
							"The Partner Offers API enables the management of offers provided by partners, allowing the retrieval of offer details.",
					},
					{
						name: "Microsite Master API",
						description:
							"This API module deals with the management of microsite master data, providing endpoints for retrieving individual microsites",
					},
					{
						name: "Consent API",
						description:
							"Get a list of consents, providing essential information about each consent available in the system.",
					},
					{
						name: "Audit API",
						description:
							"The Audit API is designed to provide a mechanism for auditing changes in the system, offering endpoints for retrieving audit records associated with specific tables and individual audit trail records.",
					},
					{
						name: "Admin User API",
						description:
							"Authenticate admin users and provide access to administrative functionalities.",
					},
					{
						name: "File Data API",
						description: "API for creating new files.",
					},
				],
			},
			apis: [
				"./src/app/**/index.ts",
				"./src/app/**/schema.ts",
				"./src/app/**/schema.ts",
				"./src/app/**/schema.ts",
				"./src/app/**/schema.ts",
				"./src/app/**/schema.ts",
			],
		});
	}
	return openapiSpecification;
};

let openApiDocHandler: RequestHandler;

export const openApiMiddleware: any = swaggerUi.serve;

export const openApiDocumentLazyHandler: RequestHandler = (req, res, next) => {
	if (!openApiDocHandler) {
		openApiDocHandler = swaggerUi.setup(getOpenApiSpecification(), {
			explorer: true,
			customSiteTitle: "BaaS Microsite Admin - OpenAPI",
			customCss: ".swagger-ui .topbar { display: none }",
		});
	}
	return openApiDocHandler(req, res, next);
};

export const getOpenApiDocumentJson: RequestHandler = (_, res) => {
	return res.status(200).json(getOpenApiSpecification());
};