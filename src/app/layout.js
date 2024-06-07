// 'use client'

import "@/styles/style.scss";

export const config = {
  amp: true,
};


const RootLayout =async ({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}) => {

  console.log("call");

  return (
    <html>
    
      <body>

        {children}
      

      </body>
    </html>
  )
}
export default RootLayout;