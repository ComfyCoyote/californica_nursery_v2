import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    console.log(ADMIN_PASSWORD)
    console.log(password)
    console.log(password === ADMIN_PASSWORD)

    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return NextResponse.json(
        { message: 'Authentication successful' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin-auth');
  
  return NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  );
}
