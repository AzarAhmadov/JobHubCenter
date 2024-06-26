import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}

const I18Middleware = createI18nMiddleware({
    locales: ['az', 'en'],
    defaultLocale: 'az',
})

export function middleware(request: NextRequest) {
    return I18Middleware(request)
}

