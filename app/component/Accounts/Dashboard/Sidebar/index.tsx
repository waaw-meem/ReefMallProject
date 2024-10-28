"use client";

import React, { useState } from "react";
import style from "./index.module.scss";
import SvgComp from "../../../SvgComp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../../../public/assets/svg/dashboard/logo.svg";

interface ISidebar {
  role: string; // vendor || customer
  setToggle: any;
}

const Sidebar = ({ role, setToggle }: ISidebar) => {
  const pathname = usePathname();
  const links = [
    {
      path: "/user-profile",
      disableIcon: "/assets/svg/dashboard/user-icon-gred.svg",
      activeIcon: "/assets/svg/dashboard/user-icon.svg",
      title: "User Profile",
      acsess: ["vendor", "customer"],
    },
    // {
    //   path: "/favorites",
    //   disableIcon: "/assets/svg/dashboard/dash-heart-gred.svg",
    //   activeIcon: "/assets/svg/dashboard/dash-heart.svg",
    //   title: "Favourites",
    //   acsess: ["customer"],
    // },
    {
      path: "/save-search",
      disableIcon: "/assets/svg/dashboard/dash-search-gred.svg",
      activeIcon: "/assets/svg/dashboard/dash-search.svg",
      title: "Save Search",
      acsess: ["customer"],
    },
    {
      path: "/upcoming-events",
      disableIcon: "/assets/svg/dashboard/dash-calendar-gred.svg",
      activeIcon: "/assets/svg/dashboard/dash-calendar.svg",
      title: "Upcoming Events",
      acsess: ["customer"],
    },
    {
      path: "/outlet-detail",
      disableIcon: "/assets/svg/dashboard/outlet-detail.svg",
      activeIcon: "/assets/svg/dashboard/outlet-detail-white.svg",
      title: "Outlet Detail",
      acsess: ["vendor"],
    },
  ];

  return (
    <div className={`${style.sidebar}`}>
      <div className={style.logoWrapper}>
        {/* TODO: change logo */}
        <Link className={style.logo} href="/">
          <SvgComp src={logo} />
        </Link>
      </div>
      <div className={style.navWrapper}>
        {links
          ?.filter((link) => link.acsess.includes(role))
          .map((link, idx) => (
            <Link
              key={idx}
              onClick={() => setToggle(true)}
              className={`
              ${style.navLink}
              ${pathname === link?.path ? `${style.active}` : ""}`}
              href={link?.path}
            >
              <Image
                alt=""
                width={28}
                height={28}
                className={style.sidebarImage}
                src={
                  pathname === link?.path ? link?.disableIcon : link?.activeIcon
                }
              />
              <span
                className={`
                  ${style.link}
                  ${pathname === link?.path ? style.activeLink : ""}`}
              >
                {link?.title}
              </span>
            </Link>
          ))}
      </div>
      <span className={style.copywrite}>
        Copyright © 2024 Reef Mall. All Rights Reserved.
      </span>
    </div>
  );
};

export default Sidebar;
