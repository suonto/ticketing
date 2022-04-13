import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage("Invalid email"),
  body('password')
    .trim()
    .isLength({ min: 4, max: 40 })
    .withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new Error('Invalid email or password');
  }

  const { email, password } = req.body;
  console.log('Creatig a user...');
  throw new Error('DB unavailable');
  res.send({});
});


export { router as signupRouter };
