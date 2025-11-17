import { NextResponse } from 'next/server';
import { createDbClient } from '@/lib/db';
import { verifyPassword, createToken } from '@/lib/auth';

export async function POST(request: Request) {
  const client = createDbClient();
  
  try {
    await client.connect();
    const { email, password } = await request.json();
    
    const { rows } = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const user = rows[0];
    const isValid = await verifyPassword(password, user.password);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const token = await createToken(user.id, user.email);
    
    const response = NextResponse.json({ 
      message: 'Login successful',
      user: { id: user.id, email: user.email }
    });
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  } finally {
    await client.end();
  }
}
