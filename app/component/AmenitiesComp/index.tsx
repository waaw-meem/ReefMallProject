"use client";

import React from "react";
import style from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import Heading from "../Common/Heading";

type amenitiesProps = {
  title: string
  subTitle: string
  richText: any
  data: any
}

const AmenitiesComp = ({ data, richText, subTitle, title }: amenitiesProps) => {

  return (
    <section className={`${style.services__sec} section`}>
      <div className="container">
        <Heading
          title={title}
          subTitle={subTitle}
        />
        <p
          className={style.subheading}
          dangerouslySetInnerHTML={{
            __html: richText ? richText : "",
          }}
        >
        </p>

        <div className={style.services__wrapper}>
          {data?.map(
            (item: any, index: number) => {
              return (
                <div className={style.services} key={index}>
                  <div className={style.svg__wrapper}>
                    <Image src={item?.img?.data?.attributes?.url} alt={"icons"} width={54} height={54} />
                    {/* <SvgComp src={item?.img?.data?.attributes?.url} /> */}
                  </div>
                  <div className={style.content}>
                    <div className={style.cMapWrapper}>
                      <h4 className={style.title}>{item?.title}</h4>
                      {/* <Link
                        href={item?.buttonLink ?? "/store-locator"}
                        target="_blank"
                      >
                      </Link> */}
                    </div>
                    <div
                      className={style.dangerousWrapper}
                      dangerouslySetInnerHTML={{
                        __html: item?.richTextCopy ? item?.richTextCopy : "",
                      }}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesComp;
