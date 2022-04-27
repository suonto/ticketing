import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';

it('returns 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
  .put(`/api/tickets/${id}`)
  .set('Cookie', global.signin())
  .send({
    title: 'asdf',
    price: 20
  })
  .expect(404)
});

it('returns 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const response = await request(app)
  .put(`/api/tickets/${id}`)
  .send({
    title: 'asdf',
    price: 20
  })
  .expect(401)
});

it('returns 401 if the user does not own the ticket', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'asdf',
    price: 20
  })
  .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'asasada',
      price: 1000
    })
    .expect(401)
});

it('returns 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin();

  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title: 'asdf',
    price: 20
  })
  .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 1000
    })
    .expect(400)

    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'foo',
      price: -10
    })
    .expect(400)
});

it('updates ticket with valid inputs', async () => {
  const cookie = global.signin();

  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', cookie)
  .send({
    title: 'asdf',
    price: 20
  })
  .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100
    })
    .expect(200)

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(100);
  });
