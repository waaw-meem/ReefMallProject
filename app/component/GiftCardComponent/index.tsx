import React from 'react';
import GiftCard from '../Common/GiftCard';
import Content from "./../../content.json";
import Heading from '../Common/Heading';
import style from "./index.module.scss";
import Image from 'next/image';

type giftCardComponent = {
  tabs?: any
  data?: any
  title:string
  subTitle:string
}

const GiftCardComponent = ({ data, tabs, title, subTitle }: giftCardComponent) => {
  return (
    <section className={`section ${style.newSection}`}>
      <div className='bg-wrapper-custom'>
        <div className='gred'></div>
        <Image src={"/assets/images/giftcard/singleCardbg.png"} alt='bg-img' width={1920} height={1559} />
      </div>
      <div className='container'>
        <div className={style.headingWrapper}>
          <div className={style.headingContainer}>
            <Heading isCenter={true} title={title} subTitle={subTitle} />
          </div>
        </div>
        <GiftCard giftCards={data} tabMenu={tabs} />
      </div>
    </section>
  );
};

export default GiftCardComponent;
