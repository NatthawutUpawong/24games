import { Context } from 'hono';
import * as bcrypt from 'bcryptjs';
import User from '../DB/user';

export const signupUser = async (c: Context) => {
  const { username, password } = await c.req.json();

  try {
    let user = await User.findOne({ username });
    if (user) {
      return c.json({ msg: 'Username already exists' }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      username,
      password: hashedPassword, 
    });

    await user.save();
    return c.json({ msg: 'User registered successfully' }, 201);
  } catch (err) {
    return c.json({ msg: 'Server Error' }, 500);
  }
};
