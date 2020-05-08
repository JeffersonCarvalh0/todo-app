import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import TodoController from '../controllers/TodoController';

/**
 * @swagger
 *
 * definitions:
 *   NewTodo:
 *     type: "object"
 *     required:
 *       - title
 *       - description
 *     properties:
 *       title:
 *         type: "string"
 *       description:
 *         type: "string"
 *       done:
 *         type: "boolean"
 *
 *   Todo:
 *     type: "object"
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       user:
 *         schema:
 *           $ref: "#/definitions/User"
 */

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417
const todoRouter = new Router<DefaultState, Context>()

  /**
   * @swagger
   * /todo:
   *   post:
   *     tags:
   *       - "Todo"
   *     summary: Creates a new Todo
   *     produces:
   *      - application/json
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/NewTodo"
   *
   *     responses:
   *       "201":
   *         description: Todo successfully created
   *         schema:
   *           $ref: "#/definitions/Todo"
   *       "400":
   *         description: Validation error
   *       "401":
   *         description: Unauthorized
   */
  .post('/todo', (ctx, next) => TodoController.createNewTodo(ctx, next))

  /**
   * @swagger
   * /todo:
   *   get:
   *     tags:
   *       - "Todo"
   *     summary: Gets all todos from the logged user
   *     produces:
   *      - application/json
   *     security:
   *       - bearerAuth: []
   *
   *     responses:
   *       "200":
   *         description: Todo successfully created
   *         schema:
   *           type: array
   *           items:
   *             $ref: "#/definitions/Todo"
   *       "401":
   *         description: Unauthorized
   */
  .get('/todo', (ctx, next) => TodoController.getTodos(ctx, next))

  /**
   * @swagger
   * /todo/{todoId}:
   *   get:
   *     tags:
   *       - "Todo"
   *     summary: Gets data of a specific Todo
   *     produces:
   *      - application/json
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: todoId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the Todo
   *
   *     responses:
   *       "200":
   *         description: Returns the Todo object
   *         schema:
   *           $ref: "#/definitions/Todo"
   *       "401":
   *         description: Unauthorized
   */
  .get('/todo/:id', (ctx, next) => TodoController.getTodo(ctx, next))

  /**
   * @swagger
   * /todo/{todoId}:
   *   put:
   *     tags:
   *       - "Todo"
   *     summary: Creates a new Todo
   *     produces:
   *      - application/json
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       content:
   *        application/json:
   *          schema:
   *            $ref: "#/definitions/NewTodo"
   *     parameters:
   *       - in: path
   *         name: todoId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the Todo
   *
   *     responses:
   *       "200":
   *         description: Todo successfully updated
   *         schema:
   *           $ref: "#/definitions/Todo"
   *       "400":
   *         description: Validation error
   *       "401":
   *         description: Unauthorized
   */
  .put('/todo/:id', (ctx, next) => TodoController.updateTodo(ctx, next))

  /**
   * @swagger
   * /todo/{todoId}:
   *   delete:
   *     tags:
   *       - "Todo"
   *     summary: Deletes a Todo
   *     produces:
   *      - application/json
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: todoId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the Todo
   *
   *     responses:
   *       "200":
   *         description: Todo successfully deleted
   *       "401":
   *         description: Unauthorized
   */
  .del('/todo/:id', (ctx, next) => TodoController.deleteTodo(ctx, next));

export default todoRouter;
