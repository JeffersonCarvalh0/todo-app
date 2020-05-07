import 'dotenv/config';
import 'reflect-metadata';
import { getConnection } from 'typeorm';

afterEach(async () => {
  await getConnection().close();
});
