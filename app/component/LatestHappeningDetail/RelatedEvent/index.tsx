"use client"
import Image from "next/image"
import EventCard from "../../Common/EventCard"

import style from "./index.module.scss"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import moment from "moment"

import 'swiper/css';
import 'swiper/css/pagination';


type eventsProps = {
    category: any
    detailId?:any
}

const RelatedEvent = ({ category,detailId }: eventsProps) => {
    const [data, setData] = useState([])
    useEffect(() => {
        const filterEvent = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_DOMAIN}/api/events?[populate]=*&filters[event_categories][key][$contains]=${category?.data?.map((item: any) => item?.attributes?.key)}`,
                    {
                        cache: "no-store",
                    }
                );
                const event = await res.json();
                const filterbyDate = event?.data?.sort((a: any, b: any) => {
                    return moment(a?.attributes?.date).toDate().getTime() - moment(b?.attributes?.date).toDate().getTime();
                });
                const filterById= filterbyDate?.filter((item:any)=> detailId !== item?.id )
                setData(filterById)
            } catch (error) {
                throw new Error("Failed to fetch data");
            }
        }
        filterEvent()
    }, [])
    if (data?.length > 0)
        return (
            <section className={`section ${style.relatedEventWrapper}`}>
                <div className='bg-wrapper-custom'>
                    <div className='gred'></div>
                    <Image src={"/assets/images/event/bg-related.png"} alt='bg-img' width={1920} height={937} />
                </div>
                <div className={style.relatedEvent}>
                    <div className="container">
                        <h2 className={style.title}>{'Related Events'}</h2>
                        <div className="custom-row">
                            <div className="col_12 col_xl_12">
                                <Swiper
                                    slidesPerView={3}
                                    allowTouchMove={true}
                                    loop={true}
                                    className="offer-slider event-slider"
                                    modules={[Autoplay,Pagination]}
                                    pagination={{
                                        clickable: true,
                                      }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    breakpoints={{
                                        360: { slidesPerView: 1 },
                                        768: { slidesPerView: 2, spaceBetween: 90 },
                                        1024: { slidesPerView: 2, spaceBetween: 10 },
                                        1440: { slidesPerView: 3, spaceBetween: 40 },
                                    }}
                                >
                                    {data?.map((item: any, index: number) => {
                                        const eventData = {
                                            title: item?.attributes?.title,
                                            date: item?.attributes?.date,
                                            img: item?.attributes?.introductionImg?.data?.attributes?.url,
                                            ctaLink: item?.attributes?.slug,
                                            desc: item?.attributes?.shortDesc
                                        }
                                        return (
                                            <SwiperSlide key={index}>
                                                <EventCard
                                                    {...eventData}
                                                />
                                            </SwiperSlide>
                                        )
                                    }
                                    )}
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
}

export default RelatedEvent