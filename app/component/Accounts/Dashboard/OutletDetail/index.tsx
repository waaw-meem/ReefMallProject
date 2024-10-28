"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import style from "./index.module.scss";
import BrandInfo from "./BrandInfoTab";
import ContactInfoTab from "./ContactInfoTab";
import BrandGalleryTab from "./BrandGalleryTab";
import BrandVideoTab from "./BrandVideoTab";
import OffersAndPromotionsTab from "./OffersAndPromotionsTab";
import AllOffersAndPromotionTab from "./AllOffersAndPromotionTab";
import { useLazyGetBrandInfoDetailsByUserIdQuery } from "@/redux/reducers/OutletApiSlice/OutletApiSlice";
import { useSession } from "next-auth/react";
import SpinLoader from "@/app/component/Loader/SpinLoader";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const OutletDetail = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [getBrandInfoDetailsByUserId, { data: brandData, isLoading }] =
    useLazyGetBrandInfoDetailsByUserIdQuery();
  const [activeIndex, setActiveIndex] = useState(1);
  const [offerID, setOfferId] = useState(null);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("bid");
    };
  }, []);

  useEffect(() => {
    if (session) {
      const { user } = session;
      getBrandInfoDetailsByUserId(user);
    }
  }, [session]);

  const brandId = useMemo(() => {
    if (brandData) {
      // TODO: will see
      const { brand } = brandData;
      if (brand?.id) return brand?.id;
      // else if (magic_planet?.id) return magic_planet?.id;
      else return null;
    }

    return null;
  }, [brandData]);
  const brandSlug = useMemo(() => {
    if (brandData) {
      // TODO: will see
      const { brand } = brandData;
      if (brand?.slug) return brand?.slug;
      // else if (magic_planet?.id) return magic_planet?.id;
      else return null;
    }

    return null;
  }, [brandData]);

  useEffect(() => {
    if (brandId) {
      // TODO: slug used instead of id
      sessionStorage.setItem("bid", brandId);
    }
    if (brandSlug) {
      // TODO: slug used instead of id
      sessionStorage.setItem("brandSlug", brandSlug);
    }
  }, [brandId, brandSlug]);

  const editPromotion = (data: any) => {
    if (data?.slug) {
      setOfferId(data);
    }
    setActiveIndex(5);
  };
  const handleChangeNav = (tab: number) => {
    // const bid = sessionStorage.getItem("bid");
    const bid = sessionStorage.getItem("brandSlug");
    if (!bid && tab !== 1) {
      toast.info("Create a Brand First");
      setActiveIndex(1);
      return;
    }
    setOfferId(null);
    setActiveIndex(tab);
  };

  const handleRevertOfferId = useCallback(() => {
    setOfferId(null);
  }, []);

  if (session?.user?.type === "customer") {
    router.push("/user-profile");
  }

  if (isLoading) return <SpinLoader size={"small"} />;
  return (
    <section className="dashboard-container">
      <div className={style.tabWrapper}>
        <div className={style.tabs}>
          <button
            className={`${style.tab}  ${activeIndex === 1 ? style.active : ""}`}
            onClick={() => {
              handleChangeNav(1);
            }}
          >
            Brand Info
          </button>
          <button
            className={`${style.tab}  ${activeIndex === 2 ? style.active : ""}`}
            onClick={() => {
              handleChangeNav(2);
            }}
          >
            Contact info
          </button>
          <button
            className={`${style.tab}  ${activeIndex === 3 ? style.active : ""}`}
            onClick={() => {
              handleChangeNav(3);
            }}
          >
            Brand Gallery
          </button>
          <button
            className={`${style.tab}  ${activeIndex === 4 ? style.active : ""}`}
            onClick={() => {
              handleChangeNav(4);
            }}
          >
            Brand Video
          </button>
          <button
            className={`${style.tab}  ${activeIndex === 5 ? style.active : ""}`}
            onClick={() => {
              handleChangeNav(5);
            }}
          >
            Offers & Promotions
          </button>
          <button
            className={`${style.tab}  ${activeIndex === 6 ? style.active : ""}`}
            onClick={() => {
              handleChangeNav(6);
            }}
          >
            All Offers & Promotion
          </button>
        </div>
        <div className={style.panel}>
          <div
            className={`${style.tabPanel} ${
              activeIndex === 1 ? style.active : ""
            }`}
          >
            {activeIndex === 1 && (
              <BrandInfo
                checkIfAlready={getBrandInfoDetailsByUserId}
                // brandId={brandId}
                brandSlug={brandSlug}
              />
            )}
          </div>
          <div
            className={`${style.tabPanel} ${
              activeIndex === 2 ? style.active : ""
            }`}
          >
            {activeIndex === 2 && <ContactInfoTab />}
          </div>
          <div
            className={`${style.tabPanel} ${
              activeIndex === 3 ? style.active : ""
            }`}
          >
            {activeIndex === 3 && <BrandGalleryTab />}
          </div>
          <div
            className={`${style.tabPanel} ${
              activeIndex === 4 ? style.active : ""
            }`}
          >
            {activeIndex === 4 && <BrandVideoTab />}
          </div>
          <div
            className={`${style.tabPanel} ${
              activeIndex === 5 ? style.active : ""
            }`}
          >
            {activeIndex === 5 && (
              <OffersAndPromotionsTab
                offerID={offerID}
                handleRevertOfferId={handleRevertOfferId}
              />
            )}
          </div>
          <div
            className={`${style.tabPanel} ${
              activeIndex === 6 ? style.active : ""
            }`}
          >
            {activeIndex === 6 && (
              <AllOffersAndPromotionTab editPromotion={editPromotion} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutletDetail;
