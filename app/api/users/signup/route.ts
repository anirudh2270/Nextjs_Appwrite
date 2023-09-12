import connect from '@/db_config/db_config';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

connect();

const Signup_schema = z.object({
  username: z.string().nonempty(),
  email: z.string().nonempty(),
  password: z.string().nonempty(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    // check if the user already exists
    try {
      Signup_schema.parse({ username, email, password });
    } catch (err) {
      return NextResponse.json({ error: err }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // if user does't exists

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const new_user = await User.create({
      username,
      email,
      password: hash,
    });

    await new_user.save();

    return NextResponse.json(
      { message: 'User created successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
