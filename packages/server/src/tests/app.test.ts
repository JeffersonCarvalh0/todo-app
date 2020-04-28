import request from 'supertest';
import runApp from '../app';

test('Hello world works', async () => {
  const response = await request(runApp()).get('/');
  expect(response.status).toBe(200);
  expect(response.body.message).toBe(
    'Automatically deployed with github actions!!!',
  );
});
