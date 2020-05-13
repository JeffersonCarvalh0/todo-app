import { DefaultState, Context } from 'koa';
import Router from 'koa-router';

import swaggerJSDoc from 'swagger-jsdoc';
import koaSwagger from 'koa2-swagger-ui';

const port = process.env.PORT || 8000;

const developmentServer = {
  url: `http://localhost:${port}/api`,
  description: 'Development server',
};

const productionServer = {
  url: 'https://todo-app-server0.herokuapp.com/api',
  description: 'Production server',
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
    },
    servers:
      process.env.NODE_ENV === 'production'
        ? [productionServer]
        : [developmentServer, productionServer],
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
