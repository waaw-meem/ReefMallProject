"use client";

import localFont from "next/font/local";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./index.module.scss";
import "../globals.scss";
import "../dashboard_global.scss";
import { useState } from "react";
import { redirect } from "next/navigation";
import Sidebar from "../component/Accounts/Dashboard/Sidebar";
import DashboardHeader from "../component/Accounts/Dashboard/Header";

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
  const [toggle, setToggle] = useState(true);
  const { data: session, status } = useSession({
    required: true,
    // TODO:
    onUnauthenticated() {
      redirect("/sign-in");
    },
  });
  // if (!session?.accessToken) {
  //   redirect("/otp");
  // }
  return (
    <html lang="en">
      <body className={nexa.className}>
        <main className="overflow-hidden">
          {session && (
            <div className={style.cutomRow}>
              <div
                className={`${style.sidebarWrapper}  ${
                  toggle ? style.active : ""
                }`}
              >
                <Sidebar setToggle={setToggle} role={session?.user?.type} />
              </div>
              <button
                onClick={() => {
                  setToggle(!toggle);
                }}
                className={`${style.navButton} ${toggle ? style.active : ""}`}
              >
                <div className={`${style.bar1} ${style.bar}`}></div>
                <div className={`${style.bar2} ${style.bar}`}></div>
                <div className={`${style.bar3} ${style.bar}`}></div>
              </button>
              <div
                className={`${style.mainContentWrapper} ${
                  toggle ? style.active : ""
                }`}
              >
                <DashboardHeader toggle={toggle} />
                {children}
              </div>
            </div>
          )}
        </main>
        <ToastContainer autoClose={3000} theme="light" />
      </body>
    </html>
  );
}
