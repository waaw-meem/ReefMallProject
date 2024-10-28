"use client"
import Image from "next/image"

import style from "./index.module.scss"
import AnchorButton from "../AnchorButton"
import { motion } from "framer-motion";
import { useState } from "react";
import ReserveForm from "../ReserveForm";


type descriptionProps = {
    reverse?: boolean
    logo?: string
    richText?: any
    img: string
    title?: string
    ctaText?: string
    ctaLink?: string
    id?: any
    data?: any
}


const TwoColumnDescription = ({ reverse, img, logo, richText, title, ctaLink, ctaText, id, data }: descriptionProps) => {

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataSends, setDataSends] = useState(false);
    const [sending, setSending] = useState("");

    const submitForm = async (val: any) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_DOMAIN}/api/event-bookings`,
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
                            phoneNumber: val.phone,
                            message: val.notes,
                            event: {
                                connect: [{ id: id }],
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
                document.querySelector("html")?.classList.remove('no-scroll');
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
    }

    return (
        <section className={`section ${style.descriptionSection}`}>
            <div className={style.bgImageWrapper}>
                <Image className={style.bgImage} src={"/assets/images/brand/brand-detail/two-coloum-bg.png"} alt={"br-image"} width={1920} height={842} />
            </div>

            <div className="container">
                <div className={`custom-row ${reverse ? "custom-row-reverse" : ""} reverse_row`}>
                    <div className="col_12 col_xl_6 col_lg_6 col_md_12 mb-2">
                        <div className={`${style.textWrapper} ${reverse ? "text-wrapper" : ""}`}>
                            {data?.length > 0 &&
                                <div className={style.tagWrapperMain}>
                                    <h5>Categories</h5>
                                    <div className={style.tagWrapper}>
                                        {data?.map((item: any, index: number) =>
                                            <span key={index}>{item?.attributes?.title}</span>
                                        )
                                        }
                                    </div>
                                </div>
                            }
                            {logo ? <Image src={logo} alt="logo" width={156} height={82} /> : ""}
                            {title ?
                                <div className={style.titleWrapper}>
                                    <h2 className={`h2 ${style.title}`}>{title}</h2>
                                </div>
                                :
                                ""}
                            <div className=" brand-detail-richtext" dangerouslySetInnerHTML={{ __html: richText ? richText : "" }} />
                            {ctaText ?
                                <div className={style.buttonWrapper}>
                                    {/* <AnchorButton title={ctaText} color="purple" link="#" /> */}
                                    <AnchorButton
                                        func={() => {
                                            setModal(true)
                                            document.querySelector("html")?.classList.add('no-scroll');
                                        }}
                                        type="button"
                                        title={ctaText}
                                        color="purple"
                                    />
                                </div>
                                : ""}
                        </div>
                    </div>
                    <div className="col_12 col_xl_6 col_lg_6 col_md_12 mb-2">
                        <div className={` ${style.imgWrapper} ${reverse ? "img-wrapper" : ""}`}>
                            <div className={style.leftImageWrapper}>
                                {img && <Image src={img} alt="logo" width={870} height={554} />}
                            </div>
                            <div className={`${style.vectorWrapper} vector-img`}>
                                <Image className={style.vector} alt="flower" src="/assets/svg/flower-dark.svg" width={320} height={359} />
                            </div>
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
                    className={`modal__wrapper ${style.modal__wrapper}`}>
                    <motion.div
                        initial={{ translateX: 1000 }}
                        animate={{ translateX: 0 }}
                        exit={{ translateX: 1000 }}
                        transition={{ duration: 0.3, stiffness: 0 }}
                        className={`modal__inner ${style.modal}`}>
                        <div className={`${style.closebtnWrapper} close-btn-wrapper`}>
                            <button
                                onClick={() => {
                                    setModal(false)
                                    document.querySelector("html")?.classList.remove('no-scroll');

                                }}
                                className={`"close-btn-purple" ${style.close}`}>
                                <Image
                                    src="/assets/svg/close.svg"
                                    alt="close"
                                    width={25}
                                    height={25}
                                />{" "}
                            </button>
                        </div>
                        <ReserveForm
                            title="Reserve the event today"
                            loading={loading}
                            onSubmit={submitForm}
                            color="purple"
                            sendText={sending}
                            dataSend={dataSends}
                        />
                    </motion.div>
                </motion.div>
            )
            }

        </section>
    )
}

export default TwoColumnDescription