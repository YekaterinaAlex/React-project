import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

const DEFAULT_LOCALE = 'en';
const LOCALES = ['en', 'ru'] as const;

type Locale = (typeof LOCALES)[number];

function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get('NEXT_LOCALE')?.value;

  const locale: Locale = isLocale(localeFromCookie)
    ? localeFromCookie
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
