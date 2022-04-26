import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = () => {
  // Build myJWT
  const payload = {
    id: '131g3j12gk1g',
    email: 'test@test.com'
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // make an object { jwt: myJWT }
  const session = { jwt: token };

  // JSON
  const sessionJSON = JSON.stringify(session)

  // encode base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return the cookie as string;
  return [`session=${base64}`];
};
