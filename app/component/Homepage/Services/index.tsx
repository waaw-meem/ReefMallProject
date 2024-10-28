'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import Image from 'next/image';

import style from './index.module.scss';
import Heading from '../../Common/Heading';
import AnchorButton from '../../Common/AnchorButton';

import Content from '../../../content.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import Link from 'next/link';

type ServiceProps = {
  title?: string,
  subTitle?: string,
  data?: any,
  ctaText?: string,
  ctaLink?: string,
  ctaTarget?: string
}

const Services = ({ title, subTitle, data, ctaText, ctaLink, ctaTarget }: ServiceProps) => {
  const [init, setInit] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<any>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = useCallback(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, []);

  useEffect(() => {
    if (init) {
      handleSlideChange();
    }
  }, [init, handleSlideChange]);

  const onSwiperInit = (swiper: any) => {
    setInit(true);
    swiperRef.current = swiper;
    handleSlideChange();
  };

  return (
    <section className={style.servicesSection}>
      <Image className={style.bgVector} src='/assets/svg/flower.svg' alt='flower-vector' width={590} height={662} />
      <Image className={style.bgImage} src='/assets/images/home/services-bg.png' alt='' width={1920} height={980} />
      <div className='container'>
        <div className={style.headingWrapper}>
          <Heading color='white' width='longText' title={title} subTitle={subTitle} />
        </div>
      </div>
      <Swiper
        effect='coverflow'
        grabCursor={true}
        centeredSlides={true}
        slidesPerView='auto'
        speed={1000}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={onSwiperInit}
        onSlideChange={handleSlideChange}
        coverflowEffect={{
          rotate: 0,
          stretch: -470,
          depth: 800,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        className={style.serviceSlider}
        initialSlide={1}
      >
        {data?.map((item: any, index: number) => {
          return (
            <SwiperSlide className={style.slides} key={index}>
              <Link href={`/services/${item?.attributes?.slug}`}>
                <div className={style.slideWrapper}>
                  <Image alt='' src={item?.attributes?.img?.data?.attributes?.url} width={1010} height={530} />
                  <div className={style.textWrapper}>
                    <h3 className='h3'>{item?.attributes?.title}</h3>
                    <AnchorButton link={`/services/${item?.attributes?.slug}`} title={ctaText} color='purple' />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}

        <div className={style.btnWrapper}>
          <button
            ref={prevRef}
            className={`${style.slider__btn} ${style.prev} ${isBeginning ? style.disabled : ''}`}
          >
            <Image src='/assets/svg/left-arrow.svg' alt='left-arrow' width={17} height={12} />
          </button>
          <button
            ref={nextRef}
            className={`${style.slider__btn} ${style.next} ${isEnd ? style.disabled : ''}`}
          >
            <Image src='/assets/svg/right-arrow.svg' alt='right-arrow' width={17} height={12} />
          </button>
        </div>
      </Swiper>
      <div className='container'>
        <div className={style.linkWrapper}>
          {ctaText && <AnchorButton link={ctaLink ? ctaLink : "/services"} title={ctaText} color='' />}
        </div>
      </div>
    </section>
  );
};

export default Services;
