import React from 'react'
import style from "./index.module.scss"
import Heading from '../Common/Heading'
import LatestOfferCard from '../Common/LatestOfferCard'
import Image from 'next/image'

type offersProps = {
  data?: any
  title?: string
  ctaText?: string
}

const Offers = ({ data, title, ctaText }: offersProps) => {
  return (
    <div>
      <section className={`section ${style.offerSection}`}>
        <div className='bg-wrapper-custom'>
          <div className='gred'></div>
          <Image src={"/assets/images/giftcard/singleCardbg.png"} alt='bg-img' width={1920} height={1559} />
        </div>
        <div className="container">
          <div className={style.headingSection}>
            <Heading title={title} />
          </div>
          <LatestOfferCard data={data} ctaText={ctaText} />
        </div>
      </section>
    </div>
  )
}

export default Offers
