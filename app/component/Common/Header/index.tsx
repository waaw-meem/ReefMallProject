"use client";

import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../SearchBar";
import AnchorButton from "../AnchorButton";
import { useSession } from "next-auth/react";
import useIcon from "../../../../public/assets/svg/user.png";
import { usePathname } from "next/navigation";

type headerProps = {
  logo: string;
  data: any;
  data2: any;
  ctaText: string;
  ctaLink: string;
};

const Header = ({ ctaLink, ctaText, data, data2, logo }: headerProps) => {
  const [showMobMenu, setShowMobMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { data: session } = useSession();
  const pathname: any = usePathname();

  const handleSearch = () => {
    console.log("search");
  };

  useEffect(() => {
    console.log("ali");
    if (showMobMenu) {
      document.querySelector("html")?.classList.add("noScroll");
    } else {
      document.querySelector("html")?.classList.remove("noScroll");
    }
  }, [showMobMenu]);

  useEffect(() => {
    setShowSearch(false);
  }, [pathname]);

  return (
    <header className={`${style.header} ${showMobMenu ? style.active : ""}`}>
      <div className="container">
        <div className={style.header__wrapper}>
          <Link href={"/"} className={style.logo}>
            <Image
              src={logo}
              alt="Reef Mall"
              width={270}
              height={28}
              sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 270px"
            />
          </Link>

          <div
            className={`${style.menu} ${showMobMenu ? style.mobileMenu : ""}`}
          >
            <button
              onClick={() => setShowMobMenu(false)}
              className={style.close__btn}
            >
              <Image
                src={"/assets/svg/close-circle.svg"}
                alt="close"
                width={36}
                height={36}
              />
            </button>
            <div className={style.topbar}>
              <ul>
                {data2?.map((item: any, index: number) => (
                  <li key={index} className={!item?.highlight ? "d-none" : ""}>
                    <Link
                      onClick={() => setShowMobMenu(false)}
                      className="w-uline"
                      target={item?.ctaTarget}
                      href={`/${item?.ctaLink}`}
                    >
                      {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <nav className={style.navbar}>
              <ul className={style.menu__wrapper}>
                {data?.map((item: any, index: number) => (
                  <li key={index} className={!item.highlight ? "d-none" : ""}>
                    <Link
                      onClick={() => setShowMobMenu(false)}
                      className={`w-uline ${style.menuLink}`}
                      href={`/${item.ctaLink}`}
                      target={item.ctaTarget}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                {pathname !== "/search" && (
                  <>
                    <div className={style.searhWrapper}>
                      <button
                        onClick={(e: any) => {
                          setShowSearch(!showSearch);
                        }}
                        className={style.search}
                      >
                        <Image
                          src="/assets/svg/search.svg"
                          alt="search"
                          width={18}
                          height={18}
                        />
                      </button>
                      <SearchBar
                        showSearch={showSearch}
                        onSearch={handleSearch}
                      />
                    </div>
                  </>
                )}
                <div className={style.linkWrapper}>
                  <AnchorButton
                    link={!session ? `/${ctaLink}` : "/user-profile"}
                    color={"purple"}
                    title={!session ? ctaText : "Dashboard"}
                  />
                </div>
              </ul>
            </nav>
          </div>
          {/* TODO: Search */}
          <div className={style.navbar__mob}>
            <div className={style.searhWrapper}>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={style.search}
              >
                <Image
                  src="/assets/svg/search.svg"
                  alt="search"
                  width={18}
                  height={18}
                />
              </button>
              <SearchBar showSearch={showSearch} onSearch={handleSearch} />
            </div>

            <Link href={`/${ctaLink}`}>
              <Image src={useIcon} width={24} height={24} alt="login" />
            </Link>
            <button
              onClick={() => setShowMobMenu(!showMobMenu)}
              className={style.hamburger}
            >
              <Image
                src="/assets/svg/hamburger.svg"
                alt="search"
                width={18}
                height={18}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
