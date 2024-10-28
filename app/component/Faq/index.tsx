'use client'

import React, { useState } from 'react'
import style from "./index.module.scss"
import Heading from '../Common/Heading'
import Image from 'next/image'
import SvgComp from '../SvgComp'

type faqProps = {
    data?: any
}

const FaqComponent = ({ data }: faqProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleClick = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (

        <div className={`section ${style.faqSection}`}>
            <div className='bg-wrapper-custom'>
                <div className='gred'></div>
                <Image src={"/assets/images/faq/bgImage.png"} alt='bg-img' width={1920} height={1559} />
            </div>
            <div className="container">
                <Heading isCenter={false} title="FAQ" subTitle="" />
                <div className="custom-row">
                    <div className="col_12">
                        <div className={style.accordionWrapper}>
                            {data.map((item: any, index: any) => (
                                <div key={index} className={`${style.accordionItem} 
                                ${activeIndex === index ? style.clicked : ''}`}
                                    style={{ maxHeight: activeIndex === index ? 'max-content' : '' }}>
                                    <div className={`${style.accordionTitle} ${activeIndex === index ? style.clicked : ''}`} onClick={() => handleClick(index)}>
                                        <span className={style.headStyle}>{item?.title}</span>
                                        <span className={`${style.iconCross} ${activeIndex === index ? style.active : ''}`}>
                                            {/* <Image src={"/assets/svg/plus.svg"} width={20} height={20} alt='addition' /> */}
                                        </span>
                                    </div>
                                    {activeIndex === index && (
                                        <div className={`${style.accordionContent}`} dangerouslySetInnerHTML={{ __html: item?.richTextCopy }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaqComponent
