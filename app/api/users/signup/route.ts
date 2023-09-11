import connect from '@/db_config/db_config';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

connect();

const Signup_schema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // check if the user already exists
    try {
      Signup_schema.parse({ username, email, password });
    } catch (err) {
      const validationError = fromZodError(err);
      console.log(validationError);
      return NextResponse.json({ error: validationError }, { status: 400 });
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

    await User.create({
      username,
      email,
      password: hash,
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
