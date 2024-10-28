'use client'

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'

import SvgComp from '../../Common/SvgComp'
import Heading from '../../Common/Heading'
import AnchorButton from '../../Common/AnchorButton'
import Content from "../../../content.json"

import Image from 'next/image'

import style from "./index.module.scss"
import "swiper/css";


type AmenitiesProps = {
    title?: string,
    subTitle?: string,
    data?: any,
    ctaText?: string,
    ctaLink?: string,
    ctaTarget?: string
}


const Amenities = ({ title, subTitle, data, ctaText, ctaLink, ctaTarget }: AmenitiesProps) => {
    const [_, setInit] = useState(false);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className={`${style.amenitiesSection}`}>
            <Image className={style.bgVector} src={'/assets/svg/flower.svg'} alt='flower-vector' width={590} height={662} />
            <div className={`container ${style.paddindRight} position-rel`}>
                <div className="custom-row">
                    <div className="col_12 col_xl_4 col_lg_5">
                        <div className={style.headingWrapper}>
                            <Heading title={title} subTitle={subTitle} />
                            <div className={style.linkWrapper}>
                                {ctaText && <AnchorButton link={ctaLink ? ctaLink : "/amenities"} color="purple" title={ctaText} />}
                            </div>
                        </div>
                    </div>
                    <div className="col_12 col_xl_8 col_lg_7">
                        <Swiper
                            className={`amenities-slider`}
                            slidesPerView={1}
                            loop={true}
                            spaceBetween={30}
                            speed={2000}
                            modules={[Autoplay, Navigation]}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onInit={() => setInit(true)}
                            breakpoints={{
                                720: {
                                    slidesPerView: 1.5
                                },
                                1024: {
                                    slidesPerView: 1.5
                                },
                                1200: {
                                    slidesPerView: 2.5
                                }
                            }}
                        >
                            {data?.map((item: any, index: number) => {
                                const imgSrc = item?.img?.data?.attributes?.url
                                const icon = item?.icon?.data?.attributes?.url
                                return (
                                    <SwiperSlide key={index} className={style.slides}>
                                        <div className={style.slideWrapper}>
                                            <Image alt='' src={imgSrc} width={420} height={739} />
                                            <div className={style.textWrapper}>
                                                <Image src={icon} width={40} height={40} alt='icon' className={style.svgStyle} />
                                                {/* <Image alt={item.title} src={item.icon} width={} /> */}
                                                <h4 className='h4'>{item?.title}</h4>
                                                <p className='p line-clamp-3'>{item?.desc}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
                <div className={style.buttonWrapper}>
                    <button
                        className={`slider-button-generic slider-button-generic-left purple ${style.slider__btn} ${style.prev}`}
                        ref={prevRef}
                    >
                        <Image src={"/assets/svg/left-arrow.svg"} alt='left-icon' width={17} height={12} />
                    </button>
                    <button
                        className={`slider-button-generic slider-button-generic-right purple ${style.slider__btn} ${style.next}`}
                        ref={nextRef}
                    >
                        <Image src={"/assets/svg/right-arrow.svg"} alt='right-icon' width={17} height={12} />

                    </button>
                </div>
            </div>
        </section>
    )
}

export default Amenities