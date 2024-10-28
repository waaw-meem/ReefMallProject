"use client";

import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Heading from "../../Common/Heading";
import EventCard from "../../Common/EventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import moment from "moment";
import SpinLoader from "../../Loader/SpinLoader";

type eventProps = {
  data: any;
  title: string;
  subTitle: string;
};

const EventsComponent = ({ data, title, subTitle }: eventProps) => {
  const [state, setState] = useState({
    filterData: data,
    loading: false,
  });
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const filterbyDate = data?.sort((a: any, b: any) => {
      return (
        moment(a?.attributes?.date).toDate().getTime() -
        moment(b?.attributes?.date).toDate().getTime()
      );
    });
    setState((prevState) => ({
      ...prevState,
      filterData: filterbyDate,
      loading: false,
    }));
  }, []);

  return (
    <div className={`section ${style.eventSection}`}>
      <div className="bg-wrapper-custom">
        <div className="gred"></div>
        <Image
          src={"/assets/images/event/bg-event.png"}
          alt="bg-img"
          width={1920}
          height={937}
        />
      </div>
      <div className="container">
        <div className={style.titleWrapper}>
          <Heading subTitle={subTitle} title={title} />
        </div>
      </div>
      <div className="container-s">
        <div className={style.eventsSlider}>
          {state?.filterData?.length > 0 ? (
            !state?.loading ? (
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={30}
                grabCursor={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Pagination, Autoplay]}
                className="event-slider"
              >
                {state?.filterData?.map((item: any, index: number) => {
                  const eventData = {
                    title: item?.attributes?.title,
                    date: item?.attributes?.date,
                    img: item?.attributes?.introductionImg?.data?.attributes
                      ?.url,
                    ctaLink: item?.attributes?.slug,
                    desc: item?.attributes?.shortDesc,
                  };
                  return (
                    <SwiperSlide key={index}>
                      <EventCard {...eventData} key={index} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div>
                <SpinLoader size={"large"} color={"purple"} />
              </div>
            )
          ) : (
            <div className="container">
              <h5 className="mb-1">There are no events at the moment.</h5>
              <h5>Stay tuned!</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsComponent;
