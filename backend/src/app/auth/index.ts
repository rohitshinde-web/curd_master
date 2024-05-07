import * as controllers from "./controller";
import { RoutesBuilder } from "../../config/routes_config";

export const Auth:RoutesBuilder = (router) =>{
        	/**
	 * @openapi
	 * /auth:
	 *   post:
	 *     tags:
	 *       - auth
	 *     description: Create new user
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties: 
	 *                 name:
	 *                      type: string
	 *                      example: 'Alfreds'
     *                      required: true
	 *                 email:
	 *                   type: string
	 *                   example: 'alfreds@gmail.com'
	 *                   required: true
	 *                 password:
	 *                    type: string
	 *                    example: ''
	 *                    required: true
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
            router.post('/auth',controllers.signUp);

                  	/**
	 * @openapi
	 * /auth/login:
	 *   post:
	 *     tags:
	 *       - auth
	 *     description: signin into api
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties: 
	 *                 email:
	 *                   type: string
	 *                   example: 'alfreds@gmail.com'
	 *                   required: true
	 *                 password:
	 *                    type: string
	 *                    example: ''
	 *                    required: true
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
         router.post('/auth/login',controllers.signIn);
}