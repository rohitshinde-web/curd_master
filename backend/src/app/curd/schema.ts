import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     AdminUserSchemas:
 *       type: object
 *       required:
 *         - user_role
 *       properties:
 *         user_role:
 *           type: string
 *           description: user_role of admin_user
 *       example:
 *         user_role: 'Ashish'
 */
export const curdSchema = Joi.object({
	customer_name: Joi.string().max(250).required(),
	user_name: Joi.string().max(250).required(),
	contact_name: Joi.string().max(250).required(),
	address: Joi.string().required(),
	city: Joi.string().required(),
	postal_code: Joi.string().max(250).required(),
	country: Joi.string().max(250).required(),
});
