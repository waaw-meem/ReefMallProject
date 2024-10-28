'use client'
import React from 'react'
import AnchorButton from '../AnchorButton'
import Image from 'next/image'


import style from "./index.module.scss"
import Link from 'next/link'

type servicesProps = {
    data?: any
}


const ServiceCard = ({ data }: servicesProps) => {
    const filterByTitle = data?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));

    return (
        <div className='custom-row'>
            {filterByTitle?.map((item: any, index: number) => {
                return (
                    <div className="col_12 col_xl_4 col_lg_6 col_md_6 mb-6" key={index}>
                        <Link href={`/services/${item?.attributes?.slug}`}>
                            <div className={style.main_wrapper}>
                                <div className={style.imageContainer}>
                                    <Image alt='' src={item?.attributes?.img?.data?.attributes?.url} width={550} height={295} className={style.img} />
                                </div>
                                <div className={style.gridContent}>
                                    <div className={style.subHeadingWrapper}>
                                        <h5 className={`h5 ${style.subHeading}`}>{item?.attributes?.title}</h5>
                                    </div>
                                    <div className={style.linkstyle}>
                                        <AnchorButton link={`/services/${item?.attributes?.slug}`} title='Explore More' color='purple' />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default ServiceCard