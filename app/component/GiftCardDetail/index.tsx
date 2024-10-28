"use client"
import React, { useState } from "react";
import Content from "./../../content.json";
import Image from "next/image";
import style from "./index.module.scss";
import { useRouter } from 'next/router';
import AnchorButton from "../Common/AnchorButton";

type GiftCardDetailProps = {
  desc?: string,
  shortDesc?: string
  img?: string
}

const GiftCardDetail = ({ desc, shortDesc, img }: GiftCardDetailProps) => {
  const [quantity, setQuantity] = useState("1");

  const productId = '1';

  return (
    <div className={`section ${style.newSection}`}>
      <div className='bg-wrapper-custom'>
        <div className='gred'></div>
        <Image src={"/assets/images/giftcard/singleCardbg.png"} alt='bg-img' width={1920} height={1559} />
      </div>
      <div className="container">

        <div className="custom-row">
          <div className="col_12 col_lg_6">
            <div className={style.imageWrapper}>
              {img && (
                <Image
                  alt={productId ? productId : "Image"}
                  src={img}
                  width={865.482}
                  height={516.252}
                  className={style.cardImage}
                />
              )}
            </div>
          </div>
          <div className="col_12 col_lg_6">
            <div className={style.mainWrapper}>
              <div dangerouslySetInnerHTML={{ __html: desc ? desc : '' }} />
              {/* <div className={style.qtyWrapper}>
                <div className={style.qty}>
                  <h3 className={style.qtyHead}>Qty</h3>
                  <input type="number" value={quantity} placeholder="1" onChange={(e) => setQuantity(e.target.value)} className={style.qtyInput} />
                </div>
                <div className={style.linkStyle}>
                  <AnchorButton title='Add to Cards' color="transparent" transparent link='#' />
                </div>
              </div> */}
            </div>
          </div>
          <div className="col_12 col_xl_12">
            <div className={style.longDescWrapper}>
              <div dangerouslySetInnerHTML={{ __html: shortDesc ? shortDesc : '' }} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default GiftCardDetail;
