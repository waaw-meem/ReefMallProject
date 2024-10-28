import React from 'react'
import ServiceCard from '../Common/ServiceCard'
import Heading from '../Common/Heading'
import style from "./index.module.scss"
import services from "../../content.json"
import Image from 'next/image'

type ServiceProps = {
    title?: string,
    desc?: string,
    data?: any
}

const ServicesComponent = ({ title, desc, data }: ServiceProps) => {
    return (
        <section className={`section ${style.serviceSection}`}>
            <div className={style.bgImage}>
                <Image
                    src={"/assets/images/service/service-bg.png"} alt='service' width={1920} height={1389} />
            </div>
            <div className="container">
                <div className={style.headingSection}>
                    <Heading title={title} subTitle={desc} />
                </div>
                <ServiceCard data={data} />
            </div>
        </section>
    )
}

export default ServicesComponent