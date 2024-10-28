"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";

import Heading from "../Heading";
import AnchorButton from "../AnchorButton";

import style from "./index.module.scss";
import { motion } from "framer-motion";
import ReserveForm from "../ReserveForm";
import moment from "moment";

type offersProps = {
  data?: any;
  category?: string;
  subTitle?: string;
  title?: string;
};

const LatestOfferSlider = ({
  data,
  category,
  title,
  subTitle,
}: offersProps) => {
  const leftSliderRef = useRef(null);
  const textSliderRef = useRef(null);
  const bottomRightSliderRef = useRef(null);
  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [brandId, setBrandId] = useState("")
  const [offers, setOffers] = useState(data)
  const [dataSends, setDataSends] = useState(false);
  const [sending, setSending] = useState("");



  const handlePrev = useCallback(
    (leftSliderRef: any, textSliderRef: any, bottomRightSliderRef: any) => {
      if (
        !leftSliderRef.current ||
        !textSliderRef.current ||
        !bottomRightSliderRef.current
      )
        return;
      leftSliderRef.current.swiper.slidePrev();
      textSliderRef.current.swiper.slidePrev();
      bottomRightSliderRef.current.swiper.slidePrev();
    },
    [leftSliderRef, textSliderRef, bottomRightSliderRef]
  );

  const handleNext = useCallback(
    (leftSliderRef: any, textSliderRef: any, bottomRightSliderRef: any) => {
      if (
        !leftSliderRef.current ||
        !textSliderRef.current ||
        !bottomRightSliderRef.current
      )
        return;
      leftSliderRef.current.swiper.slideNext();
      textSliderRef.current.swiper.slideNext();
      bottomRightSliderRef.current.swiper.slideNext();
    },
    [leftSliderRef, textSliderRef, bottomRightSliderRef]
  );

  useEffect(() => {
    const filterOffers = data?.filter((item: any) => item?.attributes?.endDate >= moment().format("yyyy-MM-DD"))
    setOffers(filterOffers)
  }, [])



  const submitForm = async (val: any) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/offer-enquiries`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            data: {
              firstName: val.name,
              lastName: val.lastname,
              email: val.email,
              phone: val.phone,
              message: val.notes,
              brand_offer: {
                connect: [{ id: brandId }],
              },
            },
          }),
        }
      );

      if (!res.ok) {
        setDataSends(true);
        setTimeout(() => {
          setDataSends(false);
        }, 3000);
      } else {
        setDataSends(true);
        setLoading(false);
        setSending("Thank you for submission!")
        setTimeout(() => {
          setDataSends(false);
          setModal(false);
        }, 3000);
        document.querySelector("html")?.classList.remove("no-scroll");
      }
    } catch (error) {
      if (error) {
        setDataSends(true);
        setTimeout(() => {
          setDataSends(false);
        }, 3000);
        setSending("Something Went Wrong!");
      }
    }
  };

  if (offers?.length > 0)
    return (
      <>
        <div className={`${style.featureSlider} feature-slider`}>
          <div className={`container container-custom`}>
            <div className="custom-row">
              <div className="col_12 col_lg_4">
                {offers?.length > 0 &&
                  <Swiper
                    ref={leftSliderRef}
                    allowTouchMove={false}
                    loop={true}
                    className="offer-slider"
                    modules={[Autoplay]}
                    speed={1000}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                  >
                    {offers?.map((img: any, index: number) => {
                      return (
                        <SwiperSlide
                          className={style.offerSlideLeft}
                          key={index}
                        >
                          <div className={style.imgWrapper}>
                            {img?.attributes?.sliderLeftImg && (
                              <Image
                                src={img?.attributes?.sliderLeftImg}
                                alt="left slide"
                                width={645}
                                height={858}
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                }
              </div>
              <div className="col_12 col_lg_7 col_lg_offset_1">
                <div className={style.headingWrapper}>
                  <Heading subTitle={subTitle} title={title} />
                </div>
                {offers?.length > 0 &&
                  <Swiper
                    ref={textSliderRef}
                    allowTouchMove={false}
                    loop={true}
                    className="offer-slider"
                    modules={[Autoplay]}
                    speed={1000}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}>
                    {offers?.map((item: any, index: number) =>
                      <SwiperSlide className={style.offerSlideText} key={index}>
                        <div className={style.textWrapper}>
                          <div className={style.leftWrapper}>
                            {item?.attributes?.brand?.data?.attributes?.logoUrl &&
                              <Image
                                src={
                                  item?.attributes?.brand?.data?.attributes?.logoUrl
                                }
                                alt="nike"
                                width={100}
                                height={100}
                              />}
                          </div>
                          <div className={style.rightWrapper}>
                            <h3 className="h3 line-clamp-2">
                              {item?.attributes?.title}
                            </h3>
                            <p className={`p lg-font`}>
                              {moment(item?.attributes?.startDate).format(
                                "MMMM Do YYYY"
                              )}{" "}
                              to{" "}
                              {moment(item?.attributes?.endDate).format(
                                "MMMM Do YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className={style.buttonWrapper}>
                          <AnchorButton
                            func={() => {
                              setModal(true);
                              setBrandId(item?.id);
                              document
                                .querySelector("html")
                                ?.classList.add("no-scroll");
                            }}
                            type="button"
                            title="Avail This Offer"
                            color="purple"
                            link="#"
                          />
                        </div>
                      </SwiperSlide>
                    )}
                  </Swiper>
                }

                <div className={style.linkWrapper}>
                  <AnchorButton link={`/latest-offers`} color="purple" title="explore offers" />
                </div>

                {offers?.length > 0 &&
                  <Swiper
                    ref={bottomRightSliderRef}
                    allowTouchMove={false}
                    initialSlide={0}
                    loop={true}
                    speed={1000}
                    className={`offer-slider ${style.bottomSlider}`}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                  >
                    {offers?.map((img: any, index: number) => {
                      return (
                        <SwiperSlide
                          className={style.offerSlideBottom}
                          key={index}
                        >
                          {img?.attributes?.sliderBottomImg && (
                            <Image
                              src={img?.attributes?.sliderBottomImg}
                              alt="right slide"
                              width={1023}
                              height={230}
                            />
                          )}
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>}
                {offers?.length > 1 &&
                  <div className={style.navButtonWrapper}>
                    <button
                      className={style.left}
                      onClick={() =>
                        handlePrev(
                          leftSliderRef,
                          textSliderRef,
                          bottomRightSliderRef
                        )
                      }>
                      <Image
                        src={"/assets/svg/left-nav-arrow.svg"}
                        alt="left-icon"
                        width={20}
                        height={10}
                      />
                      previous
                    </button>
                    <button
                      className={style.right}
                      onClick={() =>
                        handleNext(
                          leftSliderRef,
                          textSliderRef,
                          bottomRightSliderRef
                        )
                      }>
                      next
                      <Image
                        src={"/assets/svg/right-nav-arrow.svg"}
                        alt="right-icon"
                        width={20}
                        height={10}
                      />
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            // transition={{duration: 0.5}}
            className={`modal__wrapper ${style.modal__wrapper}`}
          >
            <motion.div
              initial={{ translateX: 1000 }}
              animate={{ translateX: 0 }}
              exit={{ translateX: 1000 }}
              transition={{ duration: 0.3, stiffness: 0 }}
              className={`modal__inner ${style.modal}`}
            >
              <div className={`${style.closebtnWrapper} close-btn-wrapper`}>
                <button
                  onClick={() => {
                    setModal(false);
                    document
                      .querySelector("html")
                      ?.classList.remove("no-scroll");
                  }}
                  className={`"close-btn-purple" ${style.close}`}
                >
                  <Image
                    src="/assets/svg/close.svg"
                    alt="close"
                    width={25}
                    height={25}
                  />{" "}
                </button>
              </div>
              <ReserveForm
                loading={loading}
                onSubmit={submitForm}
                title={"Avail This Offer"}
                color="purple"
                sendText={sending}
                dataSend={dataSends}
              />
            </motion.div>
          </motion.div>
        )}
      </>
    );
};

export default LatestOfferSlider;
