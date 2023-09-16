import connect from '@/db_config/db_config';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import { cookies } from 'next/headers';
import verify_token from '@/helpers/verify_token';

connect();

export async function GET(req: NextRequest) {
  try {
    try {
      await verify_token();
    } catch (error) {
      return NextResponse.json({ error: 'Token Malfunction' }, { status: 401 });
    }

    const email = req.nextUrl.searchParams.get('email');

    const result = await User.findOne({ email });

    if (!result) {
      cookies().delete('Token');
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const obj = {
      email: result.email,
      username: result.username,
      isAdmin: result.isAdmin,
    };

    return NextResponse.json({ data: obj }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
