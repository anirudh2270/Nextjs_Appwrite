import { cookies } from 'next/headers';
import * as jose from 'jose';
import connect from '@/db_config/db_config';
import User from '@/models/userModal';

connect();

export default async function verify_token() {
  try {
    const token = cookies().get('Token') || '';

    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

    const result = await jose.jwtVerify(token.value, secret);

    const user = await User.findOne({ email: result.payload.email });

    if (user.verifyToken !== token.value) {
      throw new Error();
    }
  } catch (error) {
    cookies().delete('Token');
    throw new Error();
  }
}
