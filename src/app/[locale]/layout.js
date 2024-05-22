import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
export default async function RootLayout({ children,params:{locale} }) {
    const messages = await getMessages();
    return (
      <html lang={locale}>
        <body>
         <NextIntlClientProvider messages={messages}>
            {children}
         </NextIntlClientProvider>
        </body>
      </html>
    )
  }