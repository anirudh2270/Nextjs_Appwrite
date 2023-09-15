import connect from '@/db_config/db_config';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import { cookies } from 'next/headers';

connect();

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');

    const result = await User.findOne({ email });

    if (!result) {
      cookies().delete('Token');
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
