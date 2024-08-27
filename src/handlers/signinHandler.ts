import { Context } from 'hono';
import * as jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import User from '../DB/user';
import * as bcrypt from 'bcryptjs';

export const signinUser = async (c: Context) => {
  const { username, password } = await c.req.json();

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return c.json({ msg: 'Invalid credentials name' }, 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return c.json({ msg: 'Invalid credentials password' }, 400);
    }

    const payload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1h' });

    c.header('Set-Cookie', cookie.serialize('token', token, { httpOnly: true, path: '/' }));
    
    return c.json({ message: 'Signin successful' });
  } catch (err) {
    return c.json({ msg: 'Server Error' }, 500);
  }
};
