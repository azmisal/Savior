// src/app/api/tester/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../utils/db';
import ClickData from './model';

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const { button, input } = await request.json();

  let message;
  if (button === 'happy') {
    message = `john doe and you entered: ${input}`;
  } else if (button === 'horny') {
    message = `mia khalifa and you entered: ${input}`;
  } else {
    message = 'Invalid button';
  }

  const clickEntry = new ClickData({ button, input, message });
  await clickEntry.save();

  return NextResponse.json({ message });
}
