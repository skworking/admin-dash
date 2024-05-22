import createMiddleware from 'next-intl/middleware';
import { locales,localePrefix } from './navigation';

export default createMiddleware({
    locales:['en','hn'],
    defaultLocale:'en',
   
    localePrefix,
    locales
})

export const config={
    // matcher:['/','/(en|hn)/:path*'],
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}