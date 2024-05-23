import {createSharedPathnamesNavigation} from 'next-intl/navigation';
export const locales = ['en', 'hi'];
export const localePrefix = 'always';
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});