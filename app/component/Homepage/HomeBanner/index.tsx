'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import style from "./index.module.scss"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import AnchorButton from '../../Common/AnchorButton'
import Link from 'next/link'
import { Fancybox } from '@fancyapps/ui'
import "@fancyapps/ui/dist/fancybox/fancybox.css";

type homeBannerProps = {
  data?: any
}

const HomeBanner = ({ data }: homeBannerProps) => {

  useEffect(() => {
    Fancybox.bind('[data-fancybox="video"]', {
      closeButton: true,
    });
  }, []);


  return (
    <div className={`${style.homeBanner}`}>
      {/* <div className={style.fixedWrapper}>
        <Link href='#'>
          <Image src={"/assets/images/cuisines/whatsapp.png"} width={60} height={60} alt="whatsapp icon" className={style.whatsappIcon} />
        </Link>
        <Link href='#' className={style.iconWrapper}>
          <Image src={"/assets/svg/hicon.svg"} width={24} height={24} alt="categories icon" className={style.icon} />
        </Link>
      </div> */}
      {data?.length > 0 && (
        <Swiper
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className={`banner-slider home-banner`}
          loop={true}
          speed={600}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        >
          {data?.map((item: any, index: any) => {
            const desktopImgSrc = item?.desktopImg?.data?.attributes?.url
            const mobImgSrc = item?.mobileImg?.data?.attributes?.url
            return (
              <SwiperSlide key={index} >
                <div className={`${style.bannerSlide}`}>
                  <div className={style.featuredVideo}>
                    <div className={style.imgWrapper}>
                      {desktopImgSrc &&
                        <div className={`home-banner-slide  ${style.desktopImg}`}>
                          <Image
                            src={desktopImgSrc}
                            alt={"hero-banner"}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                          />
                        </div>}
                      <iframe src={item?.videoLink} allow="autoplay; fullscreen; picture-in-picture" ></iframe>
                    </div>
                  </div>
                  <div className={style.featuredVideo}>
                    <div className={style.imgWrapper}>
                      {mobImgSrc &&
                        <div className={style.mobImg}>
                          <Image
                            src={mobImgSrc}
                            alt={"hero-banner"}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                          />
                        </div>
                      }
                      {/* <iframe src={item?.videoLink} allow="autoplay; fullscreen; picture-in-picture" ></iframe> */}
                    </div>
                  </div>
                  {/* {desktopImgSrc &&
                    <div className={`home-banner-slide  ${style.desktopImg}`}>
                      <Image
                        src={desktopImgSrc}
                        alt={"hero-banner"}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      />
                    </div>}
                  {mobImgSrc && <div className={style.mobImg}>
                    <Image
                      src={mobImgSrc}
                      alt={"hero-banner"}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    />
                  </div>} */}

                  <div className={style.sliderTextWrapper}>
                    <div className="container">
                      <h6 className={`h6 fw-500 ${style.subtitle}`}>{item?.subtitle}</h6>
                      {index == 0 ?
                        <h1 className={`h1 ${style.title}`}>{item?.title}</h1>
                        : <h2 className={`h1 ${style.title}`}>{item?.title}</h2>}
                      {item?.exploreOffersLink?.map((offer: any, idx: number) => {
                        return (
                          <AnchorButton key={idx} link={offer?.ctaLink} title={offer?.ctaText} color='purple' />
                        )
                      })}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      )}

    </div>
  )
}

export default HomeBanner