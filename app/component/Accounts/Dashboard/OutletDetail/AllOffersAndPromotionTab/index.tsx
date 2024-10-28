import Image from "next/image";
import style from "../index.module.scss";
import SvgComp from "@/app/component/SvgComp";
import { useEffect, useState } from "react";
import {
  useLazyGetOfferByBrandIdQuery,
  useRemoveOfferByIdMutation,
} from "@/redux/reducers/OutletApiSlice/OutletApiSlice";
import SpinLoader from "@/app/component/Loader/SpinLoader";
import { toast } from "react-toastify";

import editIcon from "../../../../../../public/assets/svg/edit.svg";
import removeIcon from "../../../../../../public/assets/svg/trash.svg";

type promotionProps = {
  editPromotion: any;
};

const AllOffersAndPromotionTab = ({ editPromotion }: promotionProps) => {
  const [getOfferByBrandId, { data: offersData, error, isLoading }] =
    useLazyGetOfferByBrandIdQuery();
  const [removeOfferById, { isLoading: removeLoading }] =
    useRemoveOfferByIdMutation();
  const [promotions, setPromotion] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    let bid: any = sessionStorage.getItem("bid");
    if (bid) {
      getOfferByBrandId(bid);
    }
  }, [refetch]);

  useEffect(() => {
    if (!error && offersData) {
      setPromotion(offersData?.data);
    }
  }, [offersData]);

  const removePromotion = async (id: any) => {
    try {
      const response = await removeOfferById(id).unwrap();
      setRefetch((prev) => !prev);
      toast.success("Offer removed successfully");
    } catch (error) {
      console.error("Error deleting promotion");
      setRefetch((prev) => !prev);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <SpinLoader size={"small"} />;
  if (error) return <p>Failed to display promotions</p>;
  if (promotions?.length === 0) return <p>Create a offer first</p>;
  return (
    <section className={style.allOfferPromotionSection}>
      <div className={style.allOfferPromotion}>
        <h6 className={style.dash_cardTitle}>All Offers & Promotions</h6>
        <div className="custom-row">
          {promotions.map((promotions: any, i: number) => {
            const { id, attributes: item } = promotions;
            // const date = new Date(item?.offerDisplayTimeline);
            // const dateConvert = date.toDateString() || "";
            return (
              <div className="col_12 col_xl_3 col_lg_4 col_md_6" key={id}>
                <div className={`${style.featureCrad__wrapper} `}>
                  <div className={style.img_wrapper}>
                 {item?.mobileImgUrl &&
                    <Image
                      src={item?.mobileImgUrl}
                      className={style.detailImage}
                      width={353}
                      height={184}
                      alt="cards"
                    />}
                  </div>
                  <div className={style.buttonWrapper}>
                    <button
                      className={`${style.edit} ${style.button}`}
                      onClick={() => editPromotion({ id, slug: item.slug })}
                    >
                      <SvgComp src={editIcon} />
                    </button>
                    <button
                      className={`${style.delete}  ${style.button}`}
                      onClick={() => removePromotion(id)}
                    >
                      <SvgComp src={removeIcon} />
                    </button>
                  </div>
                  <div className={`${style.content__wrapper}`}>
                    <div className={style.title__wrapper}>
                      <div className={style.title}>
                        <p
                          className={`p mb-0 white-col line-clamp-1 ${style.heading}`}
                        >
                          {item.title}
                        </p>
                      </div>
                      {/* <div className={style.title}>
                        <p className={`p mb-0 white-col ${style.date}`}>
                          {dateConvert}
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
       
      </div>
    </section>
  );
};

export default AllOffersAndPromotionTab;
