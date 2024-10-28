import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import "./styles/main.scss"


const Rocko = localFont({
  src: [
    {
      path: "../fonts/rocko-flf.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../fonts/RockoFLF-Bold.ttf",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../fonts/rocko-ultra-flf-2.ttf",
      weight: "900",
      style: "normal",
    }
  ],
});


export const metadata: Metadata = {
  title: "Homepage - Reef Mall",
  description: "Homepage - Reef Mall",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Rocko.className}>
        {children}
      </body>
    </html>
  );
}
