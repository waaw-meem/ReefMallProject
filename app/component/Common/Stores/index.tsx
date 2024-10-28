"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import Heading from "../Heading";
import AnchorButton from "../AnchorButton";
import CategoryCard from "../CategoryCard";


import style from "./index.module.scss";
// import CustomCursor from "../CustomCursor";
import { Scrollbar } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/scrollbar';

type categoryProps = {
  category: any;
  title: string;
  subTitle: string;
  ctaText: string;
  ctaLink: string;
  ctaTarget?: string;
  data: any;
};

const Stores = ({
  category,
  title,
  subTitle,
  ctaLink,
  ctaText,
  ctaTarget,
  data,
}: categoryProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorTransitioning, setCursorTransitioning] = useState(false);

  const filterByTitle = data?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));


  const handleMouseEnter = () => {
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setCursorTransitioning(true);
    setTimeout(() => {
      setShowCursor(false);
      setCursorTransitioning(false);
    }, 300);
  };
  return (
    <section className={`${style.storeSection}`}>
      <Image
        className={style.bgStores}
        width={1920}
        height={1060}
        src={"/assets/images/shop/stores-bg.png"}
        alt="stores"
      />
      <div className="container container-custom-right">
        <Heading title={title} subTitle={subTitle} color="" width="longText" />
        {/* {filterByTitle?.length > 3 ? showCursor && (
          <div className={style.cursorWrapper}>
            <CustomCursor isShow={showCursor ? true : false} color="white" />
          </div>
        ) : ""} */}
        <div className={style.tabWrapper}>
          <div className={style.tabContainer}>
            <div className={`${style.tab} ${style.active}`}>
              <p className={`p lg-font fw-500`}>Categories</p>
            </div>
            <Link href={`${category === "eat" ? category + "/cuisines" : category + "/directory"}`} className={`${style.tab}`}>
              {category === "eat" ? <p className={`p lg-font fw-500`}>Cuisines</p> : <p className={`p lg-font fw-500`}>Directory</p>}
            </Link>
          </div>
        </div>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >

          {filterByTitle?.length > 0 ? <Swiper
            slidesPerView={1}
            className={`${filterByTitle?.length > 3 ? style.cursorCustom : ""} ${style.slider}`}
            // grabCursor={true}
            scrollbar={{
              el: ".swiper-scrollbar",
              draggable: true,
            }}
            spaceBetween={30}
            loop={true}
            modules={[Scrollbar]}
            breakpoints={{
              720: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2,
              },
              1366: {
                slidesPerView: 2.5,
              },
            }}>
            {filterByTitle?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <CategoryCard
                    small={false}
                    category={item?.attributes?.type}
                    resp={item?.attributes}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
            :
            <div className={style.emptyWrapper}>
              <h6>
                No Category Found
              </h6>
            </div>
          }
          {filterByTitle?.length > 3 && <div className="swiper-scrollbar scrollbar-custom-slider primary"></div>}
        </div>
        <div className={`link-wrapper ${style.linkWrapper}`}>
          <AnchorButton target={ctaTarget} title={ctaText} color="purple" link={`${category}/${ctaLink}`} />
        </div>
      </div>
    </section>
  );
};

export default Stores;
