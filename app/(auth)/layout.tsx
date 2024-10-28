"use client";

import localFont from "next/font/local";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import "../globals.scss";
import "../dashboard_global.scss";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

const nexa = localFont({
  src: [
    {
      path: "../../fonts/Nexa-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/Nexa-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Nexa-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/Nexa-XBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (session) {
  //     if (
  //       session &&
  //       (session?.user?.type === "vendor" ||
  //         session?.user?.type === "customer") &&
  //       session?.accessToken
  //     ) {
  //       redirect("/user-profile");
  //       return;
  //     }
  //     if (
  //       session &&
  //       session?.user?.type === "vendor" &&
  //       !session?.accessToken
  //     ) {
  //       redirect("/otp");
  //     }
  //   }
  // }, [session]);

  useEffect(() => {
    if (session) {
      redirect("/user-profile");
    }
  }, [session]);

  return (
    <html lang="en">
      <body className={nexa.className}>
        <main>
          {children}
          <ToastContainer autoClose={3000} theme="light" />
        </main>
      </body>
    </html>
  );
}
