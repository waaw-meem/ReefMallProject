'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from "./index.module.scss";
import Empty from '../Empty';
import Link from 'next/link';

type CardProps = {
  tabMenu?: any
  giftCards: any[];
};

const GiftCard = ({ giftCards, tabMenu }: CardProps) => {

  const [activeTab, setActiveTab] = useState('all');
  const [categories, setCategories] = useState<any>([]);
  const [renderGiftCard, setRenderGiftCard] = useState(giftCards);


  useEffect(() => {
    const uniqueCategories = giftCards.reduce((acc: string[], card: any) => {
      if (!acc.includes(card.category)) {
        acc.push(card.category);
      }
      return acc;
    }, []);
    setCategories(uniqueCategories);
    handleTabClick(activeTab);

  }, [giftCards]);



  const handleTabClick = (category: string) => {
    const filteredGiftCards = category === 'all' ? giftCards : giftCards.filter((card: any) => card.category === category);
    setRenderGiftCard(filteredGiftCards);
    setActiveTab(category);
  };

  return (
    <div className={style.mainSectionWrapper}>
      <div className={style.tabWrapper}>
        <div className={style.tabMenu}>
          {tabMenu?.map((category: any, index: number) =>
            <button
              key={index}
              className={`${style.tabBtn} ${activeTab === (category.key === 'all' ? 'all' : category.key) ? `${style.active}` : ''}`}
              onClick={() => handleTabClick(category?.key)}
            >
              {category?.title}
            </button>
          )}

        </div>
      </div>

      {renderGiftCard.length ? (
        <div className="custom-row">
          {renderGiftCard?.map((card: any, index: number) => {
            const cardImage = card?.attributes?.img?.data?.attributes?.url
            return (
              <div key={index} className={`col_12 col_xl_4 col_lg_4 col_md_4 mb-2`}>
                <Link href={`/gift-card/${card?.attributes?.slug}`}>
                  <div className={style.cardFlexWrapper}>
                    <div className={style.imageWrapper}>
                      <Image alt={card?.category ? card?.category : "image"} src={cardImage} width={570} height={340} className={style.img} />
                    </div>
                    <h5 className={style.cardprice}>
                      {card?.attributes?.price}
                    </h5>
                  </div>
                </Link>
              </div>
            )
          }
          )}
        </div>
      ) : (
        <h5 className='text-center'>No Gift Card Found</h5>
      )}
    </div>
  );
};

export default GiftCard;
