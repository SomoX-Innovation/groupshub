import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect old /groupshub/admin* URLs to the correct /admin* path
  if (pathname.startsWith('/groupshub/admin')) {
    const newPath = pathname.replace('/groupshub/admin', '/admin')
    const redirectUrl = new URL(newPath, request.url)
    // Preserve query params
    request.nextUrl.searchParams.forEach((value, key) => {
      redirectUrl.searchParams.set(key, value)
    })
    return NextResponse.redirect(redirectUrl, { status: 301 })
  }

  if (pathname.startsWith('/admin')) {
    const auth = request.cookies.get('admin_session')?.value
    if (auth !== process.env.ADMIN_SESSION_SECRET) {
      const loginUrl = new URL('/admin-login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/groupshub/admin/:path*'],
}
