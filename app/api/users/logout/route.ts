import connect from '@/db_config/db_config';
import { NextResponse } from 'next/server';
import User from '@/models/userModal';
var jwt = require('jsonwebtoken');
import { cookies } from 'next/headers';

connect();

export async function POST() {
  try {
    const cookie_token = cookies().get('Token');

    const decoded_data = jwt.decode(cookie_token?.value);

    await User.updateOne({ email: decoded_data.data }, { verifyToken: null });

    return NextResponse.json(
      { message: 'Logout Successfull' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
