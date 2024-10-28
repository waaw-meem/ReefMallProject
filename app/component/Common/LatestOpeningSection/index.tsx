"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Heading from "../Heading";
import style from "./index.module.scss";
import AnchorButton from "../AnchorButton";
import { Swiper, SwiperSlide } from "swiper/react";
import BrandCard from "../BrandCard";
import CustomCursor from "../CustomCursor";
import { Scrollbar } from "swiper/modules";

// import 'swiper/css';
// import "swiper/css/scrollbar";

type LatestOpeningProps = {
  title: string;
  subTitle: string;
  ctaText: string;
  ctaLink: string;
  ctaTarget?: string;
  data: any;
  category?: string;
};

const LatestOpeningSection = ({
  title,
  subTitle,
  ctaLink,
  ctaText,
  ctaTarget,
  category,
  data,
}: LatestOpeningProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorTransitioning, setCursorTransitioning] = useState(false);

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
    <section className={style.latestSection} ref={sectionRef}>
      <Image
        className={style.bgLatest}
        width={1920}
        height={1060}
        src={"/assets/images/shop/bg-latest.png"}
        alt="stores"
      />

      <div className="container container-custom-right">
        <div className={style.headingWrapper}>
          <Heading
            title={title}
            subTitle={subTitle}
            color="white"
            width="longText"
          />
        </div>

        {/* {data?.length > 3 ? showCursor && (
          <CustomCursor isShow={showCursor ? true : false}
          />
        ) : ""} */}

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {data?.length > 0 && (
            <Swiper
              slidesPerView={1.5}
              className={`${style.slideWrapper} ${
                data?.length > 4 ? style.cursorCustom : ""
              }`}
              // grabCursor={true}
              scrollbar={{
                el: ".swiper-scrollbar-opening",
                draggable: true,
              }}
              spaceBetween={30}
              modules={[Scrollbar]}
              loop={true}
              breakpoints={{
                1280: {
                  slidesPerView: "auto",
                },
                540: {
                  slidesPerView: 2.25,
                },
              }}
            >
              {data?.map((item: any, index: number) => {
                const destructData = {
                  img: item?.attributes?.introductionImgUrl,
                  logo: item?.attributes?.logoUrl,
                  type: item?.attributes?.type,
                  slug: item?.attributes?.slug,
                  subCategory:
                    item?.attributes?.brand_categories?.data[0]?.attributes
                      ?.slug,
                };
                return (
                  <SwiperSlide key={index} className={style.slides}>
                    <BrandCard {...destructData} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
         {data?.length > 4 && <div className="swiper-scrollbar-opening scrollbar-custom-slider-opening white"></div>}
        </div>

        <div className={`link-wrapper ${style.linkWrapper}`}>
          <AnchorButton
            target={ctaTarget}
            title={ctaText}
            link={`/${category}/${ctaLink}`}
            hover="white"
          />
        </div>
      </div>
    </section>
  );
};

export default LatestOpeningSection;
