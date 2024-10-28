import Image from "next/image"
import style from "./index.module.scss"
import Heading from "../Heading"
import Link from "next/link"
import { useContext } from "react"

type contactProps = {
    img: string
    email: string
    phone: string
    businessHour: string
    title?: string
    subTitle?: string
}


const TwoColumnContact = ({ businessHour, email, img, phone, subTitle, title }: contactProps) => {

    let breakLine = businessHour?.replace("|", '<br>');
    if (businessHour || email || phone)
        return (
            <section className={`section ${style.ContactSection}`}>

                <div className={style.vectorWrapper}>
                    <Image className={style.vector} alt="flower" src="/assets/svg/flower.svg" width={510} height={572} />
                </div>
                <div className={style.wrapper}>
                    <div className="container container-custom-right">
                        <div className="custom-row">
                            <div className="col_12 col_xl_6 col_lg_6 col_md_6">
                                <div className={style.contactWrapper}>

                                    <Heading title={subTitle ? subTitle : "Brand info"} subTitle={title ? title : "Contact"} />
                                    <div className="custom-row">
                                        <div className="col_12 col_xl_6">
                                            {email && <div className={style.textWrapper}>
                                                <div className={`${style.iconWrapper}`}>
                                                    <div className={`${style.mail} ${style.icon}`}>

                                                        <Image src="/assets/svg/mail.svg" alt="" fill />
                                                    </div>
                                                </div>
                                                <div className={style.detailWrapper}>
                                                    <p>Email</p>
                                                    <Link href={`mailto:${email}`} className={style.link}>
                                                        <span>{email}</span>
                                                    </Link>
                                                </div>
                                            </div>}
                                            {breakLine &&
                                                <div className={style.textWrapper}>
                                                    <div className={`${style.iconWrapper}`}>
                                                        <div className={`${style.time} ${style.icon}`}>
                                                            <Image src="/assets/svg/clock.svg" alt="" fill />
                                                        </div>
                                                    </div>
                                                    <div className={style.detailWrapper}>
                                                        <p>Day & Time</p>
                                                        {/* <span className={style.timeDetail}>{txt}</span> */}
                                                        <div className={style.timeDetail} dangerouslySetInnerHTML={{ __html: breakLine ? breakLine : "" }} />
                                                    </div>
                                                </div>}
                                        </div>
                                        <div className="col_12 col_xl_4 col_xl_offset_2">
                                            {phone &&
                                                <div className={style.textWrapper}>
                                                    <div className={`${style.iconWrapper}`}>
                                                        <div className={`${style.phone} ${style.icon}`}>
                                                            <Image src="/assets/svg/phone.svg" alt="" fill />
                                                        </div>
                                                    </div>
                                                    <div className={style.detailWrapper}>
                                                        <p>Phone</p>
                                                        <Link href={`tel:${phone}`} className={style.link}>
                                                            <span>{phone}</span>
                                                        </Link>
                                                    </div>
                                                </div>}
                                            {/* <div className={style.textWrapper}>
                                            <div className={`${style.iconWrapper}`}>
                                                <div className={`${style.time} ${style.icon}`}>
                                                    <Image src="/assets/svg/clock.svg" alt="" fill />
                                                </div>
                                            </div>
                                            <div className={style.detailWrapper}>
                                                <p>Day & Time</p>
                                                <span className={style.timeDetail}>Friday to Saturday 10 AM to 11 PM</span>
                                            </div>
                                        </div> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col_12 col_xl_6 col_lg_6 col_md_6 d-flex align-item-center">
                                <div className={style.imgWrapper}>
                                  {img &&  <Image src={img} alt="contact-img" width={960} height={483} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
}

export default TwoColumnContact