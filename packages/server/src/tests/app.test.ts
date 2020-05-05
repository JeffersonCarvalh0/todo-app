import 'dotenv/config';
import request from 'supertest';
import start from '../app';

test('Hello world works', async () => {
  const app = await start();
  const response = await request(app.listen()).get('/');
  expect(response.status).toBe(404);
  expect(response.body.message).toBe(undefined);
});
