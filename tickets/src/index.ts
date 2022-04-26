import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Env var JWT_KEY is undefined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Env var MMONGO_URI is undefined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }

  console.log('connected to MongoDB');
  app.listen(3000, () => {
    console.log('Listening on 3000');
  });
}

start();
