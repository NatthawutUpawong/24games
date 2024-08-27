import { Context } from 'hono';
import * as jwt from 'jsonwebtoken';
import User from '../DB/user';
import * as cookie from 'cookie';
const SECRET_KEY = process.env.JWT_SECRET || 'secretKey';

export const getpPofile = async (c: Context) => {
    const cookies = cookie.parse(c.req.header('cookie') || '');
    const token = cookies['token'];
    console.log(cookies);
  
    if (!token) {
        return c.json({ message: 'No token provided' }, 401);
      }
    
      try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    
        const userDoc = await User.findById(decoded.userId); 
    
        if (!userDoc) {
          return c.json({ message: 'User not found' }, 404);
        }
    
        return c.json({ username: userDoc.username });
      } catch (err) {
        console.error('Error during profile access:', err);
        return c.json({ message: 'Invalid token' }, 401);
      }
  };
  