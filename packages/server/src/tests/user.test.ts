import request from 'supertest';
import { createConnection } from 'typeorm';

import start from '../app';
import { getUserRepository } from '../entity/User';

beforeAll(async () => {
  const connection = await createConnection();
  await getUserRepository().delete({});
  await connection.close();
});

describe('User', () => {
  const testUserData = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '123456',
  };

  const wrongCredentials = {
    email: 'joghdoe@gmail.com',
    password: '123456',
  };

  const wrongCredentials2 = {
    email: 'johndoe@gmail.com',
    password: '654321',
  };

  const passwordUpdateData = {
    oldPassword: testUserData.password,
    newPassword: 'abcdef',
    newPasswordConfirm: 'abcdef',
  };

  const wrongPasswordUpdateData1 = {
    oldPassword: '12345',
    newPassword: 'abcdef',
    newPasswordConfirm: 'abcdef',
  };

  const wrongPasswordUpdateData2 = {
    oldPassword: testUserData.password,
    newPassword: 'abcdef',
    newPasswordConfirm: 'acbdef',
  };

  it('Should create a new user', async () => {
    const app = await start();
    const response = await request(app.listen())
      .post('/api/user')
      .send(testUserData)
      .expect(201);

    expect(response.body.data.name).toEqual(testUserData.name);
    expect(response.body.data.email).toEqual(testUserData.email);
  });

  it('Should not create a new user with missing fields', async () => {
    const app = await start();
    const response = await request(app.listen())
      .post('/api/user')
      .send({})
      .expect(400);

    expect(response.body.data).toEqual({});
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  it('Should not create a user with an existing email', async () => {
    const app = await start();
    const response = await request(app.listen())
      .post('/api/user')
      .send(testUserData)
      .expect(400);

    expect(response.body.data).toEqual({});
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  it('Should login with the credentials', async () => {
    const app = await start();
    const response = await request(app.listen())
      .post('/api/login')
      .send(testUserData)
      .expect(200);

    expect(response.body.data.token).toBeDefined();
  });

  it('Should not login with wrong credentials', async () => {
    const app = await start();
    const server = app.listen();

    await request(server).post('/api/login').send(wrongCredentials).expect(401);

    await request(server)
      .post('/api/login')
      .send(wrongCredentials2)
      .expect(401);
  });

  it('Should get the logged user information', async () => {
    const app = await start();
    const server = app.listen();

    const loginResponse = await request(server)
      .post('/api/login')
      .send(testUserData);

    const response = await request(server)
      .get('/api/user')
      .set('Authorization', `Bearer ${loginResponse.body.data.token}`)
      .expect(200);

    expect(response.body.data.name).toEqual(testUserData.name);
    expect(response.body.data.email).toEqual(testUserData.email);
  });

  it('Should not get any user information if not authorized', async () => {
    const app = await start();
    const response = await request(app.listen()).get('/api/user').expect(401);

    expect(response.body.data).toEqual({});
  });

  it('Should update the user data', async () => {
    const app = await start();
    const server = app.listen();

    const loginResponse = await request(server)
      .post('/api/login')
      .send(testUserData);

    const response = await request(server)
      .put('/api/user')
      .set('Authorization', `Bearer ${loginResponse.body.data.token}`)
      .send({ name: 'Jane Doe' })
      .expect(201);

    expect(response.body.data.name).toEqual('Jane Doe');
    expect(response.body.data.email).toEqual(testUserData.email);
  });

  it('Should not update the user data if not authorized', async () => {
    const app = await start();
    await request(app.listen())
      .put('/api/user')
      .send({ name: 'Jane Doe' })
      .expect(401);
  });

  it('Should not update the user password with wrong data', async () => {
    const app = await start();
    const server = app.listen();

    const loginResponse = await request(server)
      .post('/api/login')
      .send(testUserData);

    await request(server)
      .put('/api/user/password')
      .set('Authorization', `Bearer ${loginResponse.body.data.token}`)
      .send(wrongPasswordUpdateData1)
      .expect(400);

    await request(server)
      .put('/api/user/password')
      .set('Authorization', `Bearer ${loginResponse.body.data.token}`)
      .send(wrongPasswordUpdateData2)
      .expect(400);
  });

  it("Should update the user's password", async () => {
    const app = await start();
    const server = app.listen();

    const loginResponse = await request(server)
      .post('/api/login')
      .send(testUserData);

    await request(server)
      .put('/api/user/password')
      .set('Authorization', `Bearer ${loginResponse.body.data.token}`)
      .send(passwordUpdateData)
      .expect(200);
  });

  it('Should not login with the old password', async () => {
    const app = await start();

    await request(app.listen())
      .post('/api/login')
      .send(testUserData)
      .expect(401);
  });

  it('Should not update the password when not authorized', async () => {
    const app = await start();

    await request(app.listen())
      .put('/api/user/password')
      .send(passwordUpdateData)
      .expect(401);
  });

  it('Should delete the user', async () => {
    const app = await start();
    const server = app.listen();

    const loginResponse = await request(server)
      .post('/api/login')
      .send({ email: testUserData.email, password: 'abcdef' });

    await request(server)
      .delete('/api/user')
      .set('Authorization', `Bearer ${loginResponse.body.data.token}`)
      .expect(200);
  });

  it('Should not delete the user if not authorized', async () => {
    const app = await start();
    await request(app.listen()).delete('/api/user').expect(401);
  });
});
