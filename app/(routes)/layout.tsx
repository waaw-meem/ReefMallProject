import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "../component/Common/Header";
import Footer from "../component/Common/Footer";
import { getApiData } from "../utilities/function";

import "../globals.scss";
import { ToastContainer } from "react-toastify";


const Rocko = localFont({
  src: [
    {
      path: "../../fonts/rocko-flf.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../fonts/RockoFLF-Bold.ttf",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../../fonts/rocko-ultra-flf-2.ttf",
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
  const getGeneralData = await getApiData("general");
  const general = getGeneralData?.data?.attributes;

  return (
    <html lang="en">
      <body className={Rocko.className}>
        <Header
          logo={general?.logo?.data?.attributes?.url}
          data={general?.menu}
          data2={general?.topMenu}
          ctaText={general?.loginText}
          ctaLink={general?.loginLink}
        />
        {children}
        <Footer
          data={general?.socialMedia}
          data2={general?.bottomMenu}
          data3={general?.footer}
          logo={general?.footerLogo?.data?.attributes?.url}
          followText={general?.followText}
          copyRightText={general?.copyRightText}
          subscribeText={general?.subscribeText}
        />
      <ToastContainer />

        {/* Icon here */}
        {/* <div className='fixedWrapper'>
          <Link href='#'>
          <Image src={"/assets/images/cuisines/whatsapp.png"} width={60} height={60} alt="whatsappicon"/>
          </Link>
          <Link href='#' className="iconWrapper">
          <Image src={"/assets/svg/hicon.svg"} width={24} height={24} alt="whatsappicon"/>
          </Link>
        </div> */}
      </body>

    </html>
  );
}
