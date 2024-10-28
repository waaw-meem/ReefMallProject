"use client";
import React, { Fragment, useEffect, useState } from "react";
import style from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";

const Breadcrumb = () => {
  const [path, setPath] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let breadcrumbArray = window.location.pathname;

      const linkPath = breadcrumbArray.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });
      setPath(pathArray);
    }
  }, []);
  return (
    <div className={style.breadcrumb}>
      <div className="container-s">
        <ul className={style.breadcrumb__listing}>
          <li className={`text-capitalize ${style.breadcrumb__item}`}>
            <Link href={"/"}>{"Home"}</Link>
          </li>
          <Image alt="arrow" src={"/assets/svg/right-chevron.svg"} width={6} height={10} />

          {path.map((item: any, i: number) => {
            let filterItem = item?.breadcrumb?.replaceAll("-", " ");
            let filterPercentage = filterItem?.replaceAll("percentage off", "%");
            let filterAnd = filterPercentage?.replaceAll("and", "&");
            let filterPercentageOff = filterAnd?.replaceAll("percentage", "%");

            const isLastItem = i === path.length - 1;

            return (
              <Fragment key={i}>
                <li
                  className={`text-capitalize ${style.breadcrumb__item} ${isLastItem ? style.active__breadcrumb : ""}`}
                >
                  {isLastItem ? (
                    filterPercentageOff
                  ) : (
                    <Link href={`${item.href}`}>{filterPercentageOff}</Link>
                  )}
                  {!isLastItem && (
                    <Image alt="arrow" src={"/assets/svg/right-chevron.svg"} width={6} height={10} />
                  )}
                </li>
              </Fragment>
            );
          })}

        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
