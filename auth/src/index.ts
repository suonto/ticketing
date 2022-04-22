import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Env var JWT_KEY is undefined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (err) {
    console.error(err);
  }

  console.log('connected to MongoDB');
  app.listen(3000, () => {
    console.log('Listening on 3000');
  });
}

start();
