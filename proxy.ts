import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './src/lib/auth';

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token && await verifyToken(token)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (!token || !(await verifyToken(token))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|assets).*)'],
};
