import { Context } from 'hono';
import * as cookie from 'cookie';

export const signoutUser = async (c: Context) => {
  c.header('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0) 
  }));

  return c.json({ message: 'Successfully signed out' });
};
