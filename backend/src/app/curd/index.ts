import * as controllers  from './controller';
import {RoutesBuilder } from '../../config/routes_config';
import {curdSchema} from './schema';
import { validationPaginationParams } from '../middlewares/pagination';

export const Curd:RoutesBuilder = (router) =>{
    	/**
	 * @openapi
	 * /curd/:
	 *   post:
	 *     tags:
	 *       - curd
	 *     description: Employee login route in microsite
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties: 
	 *                 customer_name:
	 *                      type: string
	 *                      example: 'Alfreds Futterkiste'
	 *                 contact_name:
	 *                   type: string
	 *                   example: 'Maria Anders'
	 *                 address:
	 *                    type: string
	 *                    example: 'Obere Str. 57'
	 *                 city:
	 *                   type: string
	 *                   example: 'Berlin'
	 *                 postal_code:
	 *                   type: string
	 *                   example: '12209'
	 *                 country:
	 *                   type: string
	 *                   example: 'Germany'
	 *             consent:
	 *               value:
	 *                 consent_type: 'personal_data_for_salary_account'
	 *                 consent_text: 'Receive communication fro new products&nbsp;<a href="" class="blue-142-1">Terms & Conditions</a>'
	 *                 scopes: 'client.login'
	 *                 is_required: 'true'
	 *     responses:
	 *       422:
	 *         description: Unprocessable request
	 *       400:
	 *         description: Validation errors
	 *       200:
	 *         description: Returns success on update
	 *       201:
	 *         description: Returns success on update
	 */
    router.post('/curd',controllers.addData);

	/**
	 * @openapi
	 * /curd/{customer_id}:
	 *   put:
	 *     tags:
	 *       - curd
	 *     description: Employee login route in microsite
	 *     parameters:
	 *       - in: path
	 *         name: customer_id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The customer id.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties: 
	 *                 customer_name:
	 *                      type: string
	 *                      example: 'Alfreds Futterkiste'
	 *                 contact_name:
	 *                   type: string
	 *                   example: 'Maria Anders'
	 *                 address:
	 *                    type: string
	 *                    example: 'Obere Str. 57'
	 *                 city:
	 *                   type: string
	 *                   example: 'Berlin'
	 *                 postal_code:
	 *                   type: string
	 *                   example: '12209'
	 *                 country:
	 *                   type: string
	 *                   example: 'Germany'
	 *             consent:
	 *               value:
	 *                 consent_type: 'personal_data_for_salary_account'
	 *                 consent_text: 'Receive communication fro new products&nbsp;<a href="" class="blue-142-1">Terms & Conditions</a>'
	 *                 scopes: 'client.login'
	 *                 is_required: 'true'
	 *     responses:
	 *       422:
	 *         description: Unprocessable request
	 *       400:
	 *         description: Validation errors
	 *       200:
	 *         description: Returns success on update
	 *       201:
	 *         description: Returns success on update
	 */

	router.put('/curd/:customer_id',controllers.updateData);
		/**
		* @openapi
	 * /curd:
	 *   get:
	 *     tags:
	 *       - curd
	 *     description: Retrieves audit records for a specific table.
	 *     parameters:
	 *       - in: query
	 *         name: per_page
	 *         description: Retrieves a specific microsite_master record by id.
	 *         schema:
	 *           type: integer
	 *       - in: query
	 *         name: current_page
	 *         description:  The current page number starting with 0.
	 *         schema:
	 *           type: integer
	 *     responses:
	 *       200:
	 *         description: Successful Response
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: Object
	 *               properties:
	 *                 per_page:
	 *                   type:integer
	 *                 current_page:
	 *                   type:integer
	 *             example:
	 *               per_page:10,
	 *               current_page:0
	 *       '404':
	 *         description: audit not found
	 */
    router.get('/curd',validationPaginationParams("customers"),controllers.getData);

		/**
	 * @openapi
	 *  /curd/{customer_id}:
	 *   get:
	 *     tags:
	 *       - curd
	 *     summary: Get a customer by id
	 *     description: Retrieves a specific customers record by id.
	 *     parameters:
	 *       - in: path
	 *         name: customer_id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The customer id.
	 *     responses:
	 *       '200':
	 *         description: Successful response
	 *       '404':
	 *         description: Audit not found
	 */

		router.get(
			"/curd/:customer_id",
			controllers.getDataById,
		);

				/**
	 * @openapi
	 *  /curd/{customer_id}:
	 *   delete:
	 *     tags:
	 *       - curd
	 *     summary: Get a customer by id
	 *     description: Retrieves a specific customers record by id.
	 *     parameters:
	 *       - in: path
	 *         name: customer_id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The customer id.
	 *     responses:
	 *       '200':
	 *         description: Successful response
	 *       '404':
	 *         description: Audit not found
	 */

				router.delete(
					"/curd/:customer_id",
					controllers.deleteDataById,
				);
}