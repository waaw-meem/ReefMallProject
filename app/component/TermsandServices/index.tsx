import React from 'react'
import Heading from '../Common/Heading'
import Image from 'next/image'
import style from "./index.module.scss"


type termsAndServiceProps = {
  desc?: string
}

const TermsAndServices = ({ desc }: termsAndServiceProps) => {
  return (
    <div className={`section ${style.policiesSection}`}>
      <div className="container">
        <div className='bg-wrapper-custom tos-align'>
          <div className='gred'></div>
          <Image src={"/assets/images/policy/bgImage.png"} alt='bg-img' width={1920} height={1559} />
        </div>
        <div className={style.policyPoint}>
          <div className={`custom-richText-Style`} dangerouslySetInnerHTML={{ __html: desc ? desc : '' }}></div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndServices
