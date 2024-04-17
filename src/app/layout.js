'use client'
import Head from "next/head";
import "@/styles/style.scss";
import { useEffect } from "react";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  useEffect(()=>{
    console.log("layout");
  },[])
  return (
    <html lang="en">
      <Head>
        <title>Xtreme Free Next Js Dashboard</title>
        <meta name="description" content="Xtreme Free Next Js Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  )
}