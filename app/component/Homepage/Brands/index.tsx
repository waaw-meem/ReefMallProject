import React from 'react'
import style from "./index.module.scss"
import BrandSlider from '../../Common/BrandsSlider'
import Heading from '../../Common/Heading'
import Image from 'next/image'
import Content from "../../../content.json"

type BrandsProps = {
  title?: string,
  subTitle?: string,
  data?: any,
  ctaText?: string,
  ctaLink?: string,
  ctaTarget?: string
}


const Brands = ({ title, subTitle, data, ctaText, ctaLink, ctaTarget }: BrandsProps) => {
  return (
    <section className={`${style.brandSlider}`}>
      <div className='bg-wrapper-custom'>
        <div className={style.bgImg}>
          <Image src={"/assets/images/home/bg-image-background.png"} alt='bg-img' width={1920} height={1559} />
        </div>
      </div>
      <div className="container">
        <Heading title={title} subTitle={subTitle} />
      </div>
      <BrandSlider data={data} ctaText={ctaText} ctaLink={ctaLink} ctaTarget={ctaTarget} />
    </section>
  )
}

export default Brands