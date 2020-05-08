import { DefaultState, Context } from 'koa';
import Router from 'koa-router';

import swaggerJSDoc from 'swagger-jsdoc';
import koaSwagger from 'koa2-swagger-ui';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
    },
    host: 'todo-app-server0.herokuapp.com',
    basePath: '/api',
    schemes: ['https'],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['**/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);

const swaggerUI = koaSwagger({
  title: 'Todo API',
  routePrefix: false,
  swaggerOptions: { spec: swaggerSpec },
});

const docsRouter = new Router<DefaultState, Context>().get('/docs', swaggerUI);

export default docsRouter;
