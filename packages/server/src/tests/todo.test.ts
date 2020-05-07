import request from 'supertest';
import R from 'ramda';

import start from '../app';
import Todo, { getTodoRepository } from '../entity/Todo';
import { getUserRepository } from '../entity/User';

interface TodoJson {
  title: string;
  description: string;
  done: boolean;
}

const todoListsEquals = (todosList1: TodoJson[], todosList2: TodoJson[]) => {
  const zippedTodos = R.zip(todosList1, todosList2);
  return R.all(
    (todoPair) =>
      R.equals(
        R.pick(['title', 'body'], todoPair[0]),
        R.pick(['title', 'body'], todoPair[1]),
      ),
    zippedTodos,
  );
};

let token = '';
beforeAll(async () => {
  const app = await start();
  const server = app.listen();
  await getTodoRepository().delete({});
  await getUserRepository().delete({});

  const testUserData = {
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: '123456',
  };

  await request(server).post('/api/user').send(testUserData);
  const loginResponse = await request(server)
    .post('/api/login')
    .send(testUserData);

  token = loginResponse.body.data.token;
  server.close();
});

describe('Todo', () => {
  const todo = {
    title: 'Sample title',
    description: 'Sample body',
    done: false,
  };

  const todo2 = {
    title: 'Sample title1',
    description: 'Sample body1',
    done: false,
  };

  const todo3 = {
    title: 'Sample title2',
    description: 'Sample body2',
    done: false,
  };

  it('Should not create a new todo if not authorized', async () => {
    const app = await start();
    const response = await request(app.listen())
      .post('/api/todo')
      .send(todo)
      .expect(401);

    expect(response.body.data).toEqual({});
  });

  it('Should insert a todo in the database', async () => {
    const app = await start();
    const server = app.listen();

    const response = await request(server)
      .post('/api/todo')
      .set('Authorization', `Bearer ${token}`)
      .send(todo)
      .expect(201);
    expect(response.body.data.title).toEqual(todo.title);
    expect(response.body.data.description).toEqual(todo.description);

    const response2 = await request(server)
      .post('/api/todo')
      .set('Authorization', `Bearer ${token}`)
      .send(todo2)
      .expect(201);
    expect(response2.body.data.title).toEqual(todo2.title);
    expect(response2.body.data.description).toEqual(todo2.description);

    const response3 = await request(server)
      .post('/api/todo')
      .set('Authorization', `Bearer ${token}`)
      .send(todo3)
      .expect(201);
    expect(response3.body.data.title).toEqual(todo3.title);
    expect(response3.body.data.description).toEqual(todo3.description);
  });

  it('Should get all todos', async () => {
    const app = await start();
    const response = await request(app.listen())
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(
      todoListsEquals(response.body.data, [todo, todo2, todo3]),
    ).toBeTruthy();
  });

  it('Should not get todos if unauthorized', async () => {
    const app = await start();
    const response = await request(app.listen()).get('/api/todo').expect(401);
    expect(response.body.data).toHaveLength(0);
  });

  it('Should get a single todo data', async () => {
    const app = await start();
    const server = app.listen();

    const todosResponse = await request(server)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);
    const fetchedTodo = todosResponse.body.data[1];

    const response = await request(server)
      .get(`/api/todo/${fetchedTodo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.data).toEqual(fetchedTodo);
  });

  it('Should not get a todo data if not authorized', async () => {
    const app = await start();
    const server = app.listen();

    const todosResponse = await request(server)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);
    const fetchedTodo = todosResponse.body.data[1];

    const response = await request(server)
      .get(`/api/todo/${fetchedTodo.id}`)
      .expect(401);

    expect(response.body.data).toEqual({});
  });

  it('Should update a todo', async () => {
    const app = await start();
    const server = app.listen();

    const todosResponse = await request(server)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);
    const fetchedTodo = todosResponse.body.data[1];

    const response = await request(server)
      .put(`/api/todo/${fetchedTodo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New sample title' })
      .expect(200);

    expect(response.body.data.title).toEqual('New sample title');
  });

  it('Should not update a todo if unauthorized', async () => {
    const app = await start();
    const server = app.listen();

    const todosResponse = await request(server)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);
    const fetchedTodo = todosResponse.body.data[1];

    const response = await request(server)
      .put(`/api/todo/${fetchedTodo.id}`)
      .send({ title: 'New sample title' })
      .expect(401);

    expect(response.body.data).toEqual({});
  });

  it('Should remove a todo', async () => {
    const app = await start();
    const server = app.listen();

    const todosResponse = await request(server)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);
    const fetchedTodo = todosResponse.body.data[1];

    await request(server)
      .delete(`/api/todo/${fetchedTodo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const newTodosResponse = await request(server)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);

    expect(newTodosResponse.body.data.length).toEqual(
      todosResponse.body.data.length - 1,
    );
  });

  it('Should not remove a todo if unauthorized', async () => {
    const app = await start();
    const server = app.listen();

    const todosResponse = await request(server)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);
    const fetchedTodo = todosResponse.body.data[1];

    await request(server).delete(`/api/todo/${fetchedTodo.id}`).expect(401);

    const newTodosResponse = await request(server)
      .get('/api/todo')
      .set('Authorization', `Bearer ${token}`);

    const wasRemoved = R.none(
      (todo: Todo) => todo.title === 'New sample title',
      newTodosResponse.body.data,
    );

    expect(wasRemoved).toBeFalsy();
  });
});
