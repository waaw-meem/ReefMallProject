import React from 'react';
import Image from 'next/image';
import style from "./index.module.scss";
import Link from 'next/link';
import icon from "../../../../public/assets/svg/right-arrow.svg"

type PropsOfferCard = {
  data: any;
  ctaText?: string
}

const LatestOfferCard = ({ data, ctaText }: PropsOfferCard) => {
  if (data?.length > 0) {
    return (
      <div className='custom-row'>
        {data?.map((item: any, index: number) => {
          return (
            <div className="col_12 col_xl_4 col_lg_6 col_md_6 mb-6" key={index}>
              <Link href={`/latest-offers/${item?.attributes?.slug}`}>
                <div className={style.cardWrapper}>
                  <div className={style.imageContainer}>
                    <Image
                      src={item?.attributes?.mobileImgUrl}
                      className={style.mainImg}
                      alt={item?.attributes?.title ? item?.attributes?.title : "Mobile Image"}
                      width={570} height={400} />
                  </div>
                  <div className={style.gridContent}>
                    <div className={style.subHeadingWrapper}>
                      <Image src={item?.attributes?.brand?.data?.attributes?.logoUrl} alt={item.title ? item.title : "Image"} width={80} height={80} className={style.img} />
                      <h5 className={`h5 ${style.subHeading}`}>{item?.attributes?.title}</h5>
                    </div>
                    <div className={style.linkWrapper}>
                      <Link href={`/latest-offers/${item?.attributes?.slug}`}>
                        <div className={style.viewDetail}>
                          <span>{ctaText}</span>
                          <Image src={icon} alt={item.title ? item.title : "Icon"} width={15} height={15} className={style.svg} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={style.noOffers}>
        <h5>No offers available right now</h5>
      </div>
    )
  }

};

export default LatestOfferCard;
