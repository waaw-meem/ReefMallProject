"use client";

import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Heading from "../Common/Heading";
import Image from "next/image";
import BrandCard from "../Common/BrandCard";
import SvgComp from "../Common/SvgComp";
import Search from "../../../public/assets/svg/search.svg";
import Empty from "../Common/Empty";
import SpinLoader from "../Loader/SpinLoader";

type directoryProps = {
  data: any;
  title: string;
  subTitle: string;
};

const alphabets = [
  { title: "a", key: "a" },
  { title: "b", key: "b" },
  { title: "c", key: "c" },
  { title: "d", key: "d" },
  { title: "e", key: "e" },
  { title: "f", key: "f" },
  { title: "g", key: "g" },
  { title: "h", key: "h" },
  { title: "i", key: "i" },
  { title: "j", key: "j" },
  { title: "k", key: "k" },
  { title: "l", key: "l" },
  { title: "m", key: "m" },
  { title: "n", key: "n" },
  { title: "o", key: "o" },
  { title: "p", key: "p" },
  { title: "q", key: "q" },
  { title: "r", key: "r" },
  { title: "s", key: "s" },
  { title: "t", key: "t" },
  { title: "u", key: "u" },
  { title: "v", key: "v" },
  { title: "w", key: "w" },
  { title: "x", key: "x" },
  { title: "y", key: "y" },
  { title: "z", key: "z" },
  { title: "#", key: "" },
];

const DirectorySection = ({ data, title, subTitle }: directoryProps) => {

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [state, setState] = useState({
    data: data,
    loading: false,
    alphabet: ""
  })

  const setFilter = (alphabet: any) => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    let filterData: string = "";
    if (search) {
      filterData += `&filters[title][$containsi]=${search.toLowerCase()}`;
    } else if (alphabet) {
      filterData += `&filters[title][$startsWithi]=${alphabet}`;
    }
    const filterSearch = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*&${filterData}`,
          {
            cache: "no-store",
          }
        );
        const brands = await res.json();
        setState((prevState) => ({
          ...prevState,
          loading: false,
          data: brands?.data,
          alphabet: alphabet
        }));
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    };
    filterSearch();
    // setAlphabet(alphabet);
    // setBrands([...filterSearch]);
  };

  useEffect(() => {
    const filterByTitle = data?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));
    setState((prevState) => ({
      ...prevState,
      loading: false,
      data: filterByTitle,
    }));
  }, [])


  return (
    <section className={style.directorySection}>
      <div className="bg-wrapper-custom">
        <div className="gred"></div>
        <Image
          className={style.bgStores}
          width={1920}
          height={1060}
          src={"/assets/images/directory/directoryBgimage.png"}
          alt="stores"
        />
      </div>
      <div className="container">
        <div className={style.headingSection}>
          <Heading title={subTitle} subTitle={title} width="longText" />
        </div>
        <div className={style.filterWrapper}>
          <h5 className={`h5 ${style.title}`}>Sort by: A-Z</h5>
          <div className={style.filter}>
            <div className={style.filterContainer}>
              {alphabets?.map((item: any, index: number) => (
                <button
                  onClick={() => setFilter(item?.key)}
                  key={index}
                  className={`${item?.key === state.alphabet ? style.active : ""} ${style.filterItem
                    }`}
                >
                  {item?.title}
                </button>
              ))}
            </div>
            <div className={style.searchWrapper}>
              <button
                className={style.searchButton}
                onClick={() => setShowSearch(!showSearch)}
              >
                <SvgComp src={Search} />
              </button>
              <input
                onChange={(e) => setSearch(e.target.value)}
                className={`${showSearch ? style.active : ""} ${style.searchInput
                  }`}
                type="text"
                placeholder="Search"
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') {
                    setFilter(e.target.value === "" ? "" : e.target.value?.substring(0, 1));
                  }
                }}
              />
              <button
                onClick={() => {
                  setFilter(search ? search?.substring(0, 1) : "");
                }}
              >
                <Image
                  className={`${showSearch ? style.active : ""} ${style.searchArrow
                    }`}
                  src={"/assets/svg/right-arrow-purple.svg"}
                  alt="arrow"
                  height={18}
                  width={18}
                />
              </button>
            </div>
          </div>
        </div>
        {!state.loading ?
          state?.data?.length > 0 ? (
            <div className="custom-row">
              {state?.data?.map((item: any, index: number) => {
                const destructData = {
                  img: item?.attributes?.brandInfoImgUrl,
                  logo: item?.attributes?.logoUrl,
                  type: item?.attributes?.type,
                  slug: item?.attributes?.slug,
                  subCategory: item?.attributes?.brand_categories?.data[0]?.attributes?.slug
                };
                return (
                  <div className="col_6 col_xl_3 mb-2" key={index}>
                    <BrandCard {...destructData} category={"shop"} />
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty />
          ) :
          <SpinLoader size={"60"} color={"primary"} />
        }
      </div>
    </section>
  );
};

export default DirectorySection;
