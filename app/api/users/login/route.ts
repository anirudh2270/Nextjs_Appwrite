import connect from '@/db_config/db_config';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
var jwt = require('jsonwebtoken');
import { cookies } from 'next/headers';

connect();

const login_schema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Validations

    try {
      login_schema.parse({ email, password });
    } catch (err) {
      return NextResponse.json({ error: err }, { status: 400 });
    }

    // check if your exists

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'Incorrect Email Address' },
        { status: 409 }
      );
    }

    // check password

    const result = await bcrypt.compare(password, user.password);

    if (result === false) {
      return NextResponse.json(
        { error: 'Incorrect Password' },
        { status: 409 }
      );
    }

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: email,
      },
      process.env.TOKEN_SECRET
    );

    await User.updateOne(
      { email },
      {
        verifyToken: token,
      }
    );

    cookies().set({
      name: 'Token',
      value: token,
    });

    return NextResponse.json({ message: 'Login Successfull' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
