import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import UserController from '../controllers/UserController';

/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: "object"
 *     required:
 *       - name
 *       - email
 *       - password
 *     properties:
 *       name:
 *         type: "string"
 *       email:
 *         type: "string"
 *       password:
 *         type: "string"
 *         format: password
 *
 *   User:
 *     type: "object"
 *     required:
 *       - name
 *       - email
 *       - id
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 */

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417
const userRouter = new Router<DefaultState, Context>()

  /**
   * @swagger
   * /login:
   *   post:
   *     tags:
   *       - "User"
   *     summary: Performs authentication with email and password
   *     produces:
   *      - application/json
   *     requestBody:
   *       content:
   *        application/json:
   *          schema:
   *            type: "object"
   *            properties:
   *              email:
   *                type: string
   *                required: true
   *              password:
   *                type: string
   *                required: true
   *
   *     responses:
   *       "200":
   *         description: Returns the API token
   *         schema:
   *           type: object
   *           properties:
   *             token:
   *               type: string
   *       "401":
   *         description: Invalid credentials
   */
  .post('/login', (ctx, next) => UserController.login(ctx, next))

  /**
   * @swagger
   * /user:
   *   post:
   *     tags:
   *       - "User"
   *     summary: Creates a new user
   *     produces:
   *      - application/json
   *     requestBody:
   *       content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/NewUser"
   *
   *     responses:
   *       "201":
   *         description: User successfully created
   *         schema:
   *           $ref: "#/definitions/User"
   *       "400":
   *         description: Validation error
   */
  .post('/user', (ctx) => UserController.createNewUser(ctx))

  /**
   * @swagger
   * /user:
   *   get:
   *     tags:
   *       - "User"
   *     summary: Gets info from the current user
   *     produces:
   *      - application/json
   *     security:
   *       - bearerAuth: []
   *
   *     responses:
   *       "200":
   *         description: Returns the user data
   *         schema:
   *           $ref: "#/definitions/User"
   *       "401":
   *         description: Unauthorized
   */
  .get('/user', (ctx, next) => UserController.getUserInfo(ctx, next))

  /**
   * @swagger
   * /user:
   *   put:
   *     tags:
   *       - "User"
   *     summary: Updates the current user data
   *     produces:
   *      - application/json
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       content:
   *        application/json:
   *          schema:
   *            type: "object"
   *            properties:
   *              name:
   *                type: string
   *              email:
   *                type: string
   *
   *     responses:
   *       "200":
   *         description: Returns the updated user data
   *         schema:
   *           $ref: "#/definitions/User"
   *       "400":
   *         description: Validation error
   *       "401":
   *         description: Unauthorized
   */
  .put('/user', (ctx, next) => UserController.updateUser(ctx, next))

  /**
   * @swagger
   * /user/password:
   *   put:
   *     tags:
   *       - "User"
   *     summary: Updates the user's password
   *     produces:
   *      - application/json
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       content:
   *        application/json:
   *          schema:
   *            type: "object"
   *            properties:
   *              oldPassword:
   *                type: string
   *                required: true
   *              newPassword:
   *                type: string
   *                required: true
   *              newPasswordConfirm:
   *                type: string
   *                required: true
   *
   *     responses:
   *       "200":
   *         description: Password update was a success
   *       "400":
   *         description: Validation error
   *       "401":
   *         description: Unauthorized
   */
  .put('/user/password', (ctx, next) =>
    UserController.updatePassword(ctx, next),
  )

  /**
   * @swagger
   * /user:
   *   delete:
   *     tags:
   *       - "User"
   *     summary: Deletes the currently logged user
   *     produces:
   *      - application/json
   *     security:
   *       - bearerAuth: []
   *
   *     responses:
   *       "200":
   *         description: User successfully deleted
   *       "401":
   *         description: Unauthorized
   */
  .del('/user', (ctx, next) => UserController.deleteUser(ctx, next));

export default userRouter;
