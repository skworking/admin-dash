import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode:false,
    experimental:{
      amp:{
        optimizer:{
          enabled:true,
        }
      },
      serverActions:true
     },
    // experimental: {
      // appDir: true,
      // serverActions: true,
      // async headers() {
      //   return [
      //     {
      //       // matching all API routes
      //       // https://vercel.com/guides/how-to-enable-cors
      //       source: "/api/:path*",
            
      //       headers: [
      //         { key: "Access-Control-Allow-Credentials", value: "true" },
      //         { key: "Access-Control-Allow-Origin", value: "*" },
      //         {
      //           key: "Access-Control-Allow-Methods",
      //           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      //         },
      //         {
      //           key: "Access-Control-Allow-Headers",
      //           value:
      //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      //         },
      //       ],
      //     },
      //   ];
      // },
    // },
    async headers() {
      return [
        {
          // matching all API routes
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ]
        }
      ]
    },
  
    // redirect 307 issues fix in dynamic routing
    // async redirects() {
    //   return [
    //     {
    //       source: '/old-route',
    //       destination: '/brands/tata',// Matched parameters can be used in the destination
    //       permanent: true,
    //     },
    //   ]
    // },
  };
export default withNextIntl(nextConfig);