import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect old /groupshub/admin* URLs to the correct /admin* path
  if (pathname.startsWith('/groupshub/admin')) {
    const newPath = pathname.replace('/groupshub/admin', '/admin')
    const redirectUrl = new URL(newPath, request.url)
    request.nextUrl.searchParams.forEach((value, key) => {
      redirectUrl.searchParams.set(key, value)
    })
    return NextResponse.redirect(redirectUrl, { status: 301 })
  }

  // Admin routes use a signed cookie set by /api/admin/login, not Supabase auth
  if (pathname.startsWith('/admin')) {
    const auth = request.cookies.get('admin_session')?.value
    if (auth !== process.env.ADMIN_SESSION_SECRET) {
      const loginUrl = new URL('/admin-login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // Refresh the Supabase session for user-facing routes (required for Google login)
  const { supabaseResponse, user } = await updateSession(request)

  if (pathname.startsWith('/cover-letter-generator') || pathname.startsWith('/api/generate-cover-letter')) {
    if (!user) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'You must be signed in to generate a cover letter.' }, { status: 401 })
      }
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
