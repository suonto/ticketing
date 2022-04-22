import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password'
import { validateRequest } from "../middlewares/validate-request";
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password not supplied')
],
  validateRequest,
  async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await Password.compare(existingUser.password, password);

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email
    },
    // Exclamation mark ignores the possibility of undefined
    process.env.JWT_KEY!
  );

  //  Store it on session object
  req.session = {
    jwt: userJwt
  };

  res.send(existingUser);

});

export { router as signinRouter };
