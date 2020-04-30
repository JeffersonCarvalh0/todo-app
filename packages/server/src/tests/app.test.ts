import 'dotenv/config';
import request from 'supertest';
import runApp from '../app';

test('Hello world works', async () => {
  const response = await request(runApp()).get('/');
  expect(response.status).toBe(404);
  expect(response.body.message).toBe(undefined);
});
