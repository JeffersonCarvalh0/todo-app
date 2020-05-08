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
  },
  apis: ['./routes/**'],
};
const swaggerSpec = swaggerJSDoc(options);

const swaggerUI = koaSwagger({
  title: 'Todo API',
  routePrefix: false,
  swaggerOptions: { spec: swaggerSpec },
});

const docsRouter = new Router<DefaultState, Context>().get('/docs', swaggerUI);

export default docsRouter;
