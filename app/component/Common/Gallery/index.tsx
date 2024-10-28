'use client'

import React, { useContext, useRef, useState } from 'react'
import Heading from '../Heading'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css/scrollbar';
import "swiper/css";
import style from "./index.module.scss"

type galleryProps = {
  title?: string,
  data?: any
  subTitle?: string
}

const Gallery = ({ data, title, subTitle }: galleryProps) => {
  // const generalData = useContext<any>(MyContext);

  const [_, setInit] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (data?.length > 0)
    return (
      <section className={`section ${style.gallerSection}`}>
        <div className="container">
          <Heading title={title ? title : "Explore Our Brand's Stunning Gallery"} subTitle={subTitle ? subTitle : "GALLERY"} color='white' />
        </div>
        <div className={style.iconWrapper}>
          <Image src="/assets/svg/flower.svg" alt='flower' width={593} height={666} />
        </div>
        <div className={`${style.GalleySlider}`}>
          {data?.length && <Swiper
            slidesPerView={'auto'}
            className={`gallery-slider`}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            spaceBetween={30}
            modules={[Navigation, Scrollbar]}
            onInit={() => setInit(true)}
            loop={true}
            scrollbar={{
              el: '.swiper-scrollbar',
              hide: false,
            }}
          >
            {data?.map((item: any, index: number) => {

              return (
                <SwiperSlide key={index} className={style.gallerySlide}>
                  <div className={style.imgWrapper}>
                    <Image src={item} alt='gallery' width={490} height={570} />
                  </div>
                </SwiperSlide>
              )
            }

            )}

          </Swiper>}
        </div>
        <div className={`gallery-swiper-scrollbar ${style.navigationWrapper}`}>
          <div className={`swiper-scrollbar ${style.scrollBar}`}></div>
          <div className={style.buttonWrapper}>
            <button
              className={`slider-button-generic slider-button-generic-left  ${style.slider__btn} ${style.prev}`}
              ref={prevRef}
            >
              <Image src={"/assets/svg/left-arrow.svg"} alt='left-icon' width={14} height={16} />
            </button>
            <button
              className={`slider-button-generic slider-button-generic-right  ${style.slider__btn} ${style.next}`}
              ref={nextRef}
            >
              <Image src={"/assets/svg/right-arrow.svg"} alt='right-icon' width={14} height={16} />
            </button>
          </div>
        </div>
      </section>
    )
}

export default Gallery