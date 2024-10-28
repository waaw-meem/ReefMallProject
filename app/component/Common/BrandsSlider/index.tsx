'use client'

import React, { useRef, useState } from 'react'
import style from "./index.module.scss"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import Image from 'next/image'
import AnchorButton from '../AnchorButton'
import Link from 'next/link'

type brandSliderProps = {
    data?: any,
    ctaText?: string,
    ctaLink?: string,
    ctaTarget?: string
}

const BrandSlider = ({ data, ctaText, ctaLink, ctaTarget }: brandSliderProps) => {
    const [_, setInit] = useState(false);

    const prevRef = useRef(null);
    const nextRef = useRef(null);


    return (
        <div className={`${style.brandSlider} brand-slider`}>
            <Swiper
                slidesPerView={'auto'}
                pagination={{
                    clickable: true,
                }}
                centeredSlides={true}
                loop={false}
                modules={[Autoplay, Navigation]}
                initialSlide={data?.length > 5 ? 3 : data?.length < 2 ? 0 : 1}
                className="mySwiper"
                speed={600}
                // autoplay={{
                //     delay: 3000,
                //     disableOnInteraction: false,
                // }}
                // onSlideChange={(swiper) => {
                //     const currentIndex = swiper.realIndex;
                //     const bgPosition = `${currentIndex * 100}%`;
                //     (document.querySelector('.feature-slider') as HTMLElement).style.backgroundPosition = `center ${bgPosition}`;
                // }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onInit={() => setInit(true)}
            >
                {data?.map((item: any, index: number) => {
                    const imgSrc = item?.attributes?.homePageBrandBackgroundImgCtaLink
                    const logo = item?.attributes?.logoUrl;
                    // const imgSrc = item?.attributes?.introductionImgUrl
                    if (imgSrc) {
                        return (
                            <SwiperSlide key={index} className={`img-wrapper-brand ${style.brandSlide}`}>
                                <Link href={`${item?.attributes?.type.toLowerCase()}/categories/${item?.attributes?.brand_categories?.data[0]?.attributes?.slug}/${item?.attributes?.slug}`}>
                                    <div className={`${style.imgWrapper}`}>
                                        {imgSrc && imgSrc.includes("http") && <Image src={imgSrc} className={`bg-img-brand ${style.bgImage}`} alt='slide-1' width={442} height={826} />}
                                        {/* {logo && logo.includes("http") && <Image src={logo} className={style.brandLogo} alt='slide-1' width={226} height={226} />} */}
                                        {/* <Image src={introImg} className={style.brandIntroImg} alt='slide-1' width={415} height={567} /> */}
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    }
                })}

            </Swiper>
            <div className={`generic-slider-button-wrapper ${style.buttonWrapper}`}>
                <div className={style.buttonSection}>
                    <button
                        className={`slider-button-generic slider-button-generic-left ${style.slider__btn} ${style.prev}`}
                        ref={prevRef}
                    >
                        <Image src={'/assets/svg/left-arrow.svg'} alt='left-icon' width={14.5} height={16.13} />
                    </button>
                    <button
                        className={`slider-button-generic slider-button-generic-right ${style.slider__btn} ${style.next}`}
                        ref={nextRef}
                    >
                        <Image src={'/assets/svg/right-arrow.svg'} alt='right-icon' width={14.5} height={16.13} />

                    </button>
                </div>
                {ctaText && <AnchorButton link={ctaLink ? ctaLink : "/shop/shop-categories"} title={ctaText} color={'purple'} target={ctaTarget} />}
            </div>
        </div>
    )
}

export default BrandSlider