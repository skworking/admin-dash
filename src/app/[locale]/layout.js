import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Head from 'next/head';

import Script from 'next/script';
// import "@/styles/style.scss";
export default async function RootLayout({ children,params:{locale} }) {
    const messages = await getMessages();

    return (
      <html lang={locale}>
        {/* <Head>
        </Head> */}
        
        <Script async src="https://cdn.ampproject.org/v0.js"></Script>
        <Script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></Script>
        <Script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></Script>
        <Script  async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></Script>
        <Script   async custom-element="amp-story-player" src="https://cdn.ampproject.org/v0/amp-story-player-0.1.js"></Script>
        <Script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></Script>
        <Script async custom-element="amp-consent" src="https://cdn.ampproject.org/v0/amp-consent-0.1.js"></Script>
        <body>

         <NextIntlClientProvider messages={messages}>
            {children}
         </NextIntlClientProvider>
       
        </body>
      </html>
    )
  }