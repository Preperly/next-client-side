import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;

    const protectedRoutes = ['/profile', 'restaurant', '/home'];

    if (protectedRoutes.includes(request.nextUrl.pathname)) {
        if (token) {
            try {
                verifyToken(token);
                return NextResponse.next();
            } catch (error) {
                console.log("Invalid token, redirecting to register");
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } else {
            console.log("No token found, redirecting to register");
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    if (request.nextUrl.pathname === '/') {
        if (token) {
            try {
                verifyToken(token);
                return NextResponse.redirect(new URL('/home', request.url));
            } catch (error) {
                console.log("Invalid token, redirecting to register");
                return NextResponse.redirect(new URL('/register', request.url));
            }
        } else {
            console.log("No token found, redirecting to register");
            return NextResponse.redirect(new URL('/register', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/home', '/profile', '/restaurant', '/'],
};