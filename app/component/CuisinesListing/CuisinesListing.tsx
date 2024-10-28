"use client";

import React, { useCallback, useEffect, useState } from "react";
import Heading from "../Common/Heading";
import BrandCard from "../Common/BrandCard";
import style from "./index.module.scss";
import Image from "next/image";
import SvgComp from "../Common/SvgComp";
import rightIcon from "../../../public/assets/svg/right-chev.svg";
import searchIcon from "../../../public/assets/svg/search.svg";
import LoadingComponent from "../Loading";
import Empty from "../Common/Empty";
import InfiniteScroll from "react-infinite-scroll-component";
import PageLoader from "../PageLoader";

type Brand = {
  attributes: {
    brandInfoImgUrl: string;
    logoUrl: string;
    type: string;
    slug: string;
    brand_categories: {
      data: {
        attributes: {
          slug: string;
        };
      }[];
    };
  };
};

type cuisinesProps = {
  title?: string;
  cuisineData?: Brand[];
  subtitle?: string;
  sortHeading?: string;
  categories?: any;
  totalBrandsCount: number;
};

type State = {
  dishes: Brand[];
  filters: Set<string>;
  loading: boolean;
  searchQuery: string;
  selectQuery: string;
  hasMore: boolean;
  filterCategory: any
};

const CuisinesListing = ({
  title,
  cuisineData,
  subtitle,
  sortHeading,
  categories,
  totalBrandsCount,
}: cuisinesProps) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const [state, setState] = useState<State>({
    dishes: [],
    filters: new Set<string>(),
    loading: false,
    searchQuery: "",
    selectQuery: "",
    hasMore: true,
    filterCategory: categories?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title))
  });



  useEffect(() => {
    const fetchInitialData = async () => {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*&filters[type][$eqi]=eat&pagination[limit]=6`,
          {
            cache: "no-store",
          }
        );
        const collectionData = await res.json();
        const filterByTitle = collectionData?.data?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));
        setState((prevState) => ({
          ...prevState,
          dishes: filterByTitle,
          loading: false,
          hasMore: filterByTitle.length >= 6,
        }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    };
    fetchInitialData();
  }, []);

  const getMoreBrands = async () => {
    if (!state.hasMore) return;

    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*&[populate][cuisines][populate]=*&sort[0]=title&filters[type][$eqi]=eat&pagination[start]=${state.dishes.length
        }&pagination[limit]=6${state.searchQuery ? `&filters[cuisines][title][$containsi]=${state.searchQuery}` : ''}${state.selectQuery}`,
        {
          cache: "no-store",
        }
      );

      const brandsData: any = await res.json();
      const newDishes = brandsData?.data || [];
      const filterByTitle = newDishes?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));

      setState((prevState) => ({
        ...prevState,
        dishes: [...prevState.dishes, ...filterByTitle],
        loading: false,
        hasMore: filterByTitle.length >= 6,
      }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const onSearch = async (event: any) => {
    event.preventDefault()
    // const query = event.target.value.toLowerCase();
    // console.log(query)
    setState((prevState) => ({
      ...prevState,
      loading: true,
      // searchQuery: query,
    }));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*&[populate][cuisines][populate]=*&filters[type][$eqi]=eat${state.searchQuery ? `&filters[title][$containsi]=${state.searchQuery}` : ''}${state.selectQuery}`,
        {
          cache: "no-store",
        }
      );
      const collectionData = await res.json();
      const filterByTitle = collectionData?.data?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));

      setState((prevState) => ({
        ...prevState,
        dishes: filterByTitle,
        loading: false,
        hasMore: filterByTitle.length >= 6,
      }));

    } catch (error) {
      console.error("Failed to fetch data:", error);
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const handleFilterChange = useCallback(
    async (event: any) => {
      const value = event.target.value;
      const checked = event.target.checked;
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const newFilters = new Set(state.filters);
      if (checked) {
        newFilters.add(value);
      } else {
        newFilters.delete(value);
      }

      const filterQuery = Array.from(newFilters)
        .map((filter) => `&filters[cuisines][title][$eqi]=${filter}`)
        .join("");

        console.log(filterQuery)

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/brands?[populate][images][populate]=*&[populate][logo][populate]=*&[populate][introductionImg][populate]=*&[populate][socialMedia][populate]=*&[populate][brandInfoImg][populate]=*&[populate][brandsGallery][populate]=*&[populate][videoSection][populate]=*&[populate][brand_offers][populate]=*&[populate][brand_categories][populate]=*&[populate][cuisines][populate]=*&filters[type][$eqi]=eat${state.searchQuery ? `&filters[cuisines][title][$containsi]=${state.searchQuery}` : ''}${filterQuery}`,
          {
            cache: "no-store",
          }
        );
        const collectionData = await res.json();
        const filterByTitle = collectionData?.data?.sort((item: any, b: any) => item?.attributes?.title.localeCompare(b?.attributes?.title));

        setState((prevState) => ({
          ...prevState,
          dishes: filterByTitle,
          filters: newFilters,
          loading: false,
          selectQuery: filterQuery,
          hasMore: filterByTitle.length >= 6,
        }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    },
    [state.searchQuery, state.filters]
  );

  useEffect(() => {

    setState((prevState) => ({
      ...prevState,
      dishes: cuisineData || [],
    }));
  }, [cuisineData]);

  return (
    <section className={`section bg-lightbrown ${style.cuisineSection}`}>
      <div className='bg-wrapper-custom'>
        <div className='gred'></div>
        <Image src={"/assets/images/cuisines/cuisinessectionbg.png"} alt='bg-img' width={1920} height={1559} />
      </div>
      <div className="container">
        <div className="custom-row mb-4">
          <div className="col_12 col_xl_5 col_lg_5 col_md_8">
            <Heading isCenter={false} title={title} subTitle={subtitle} />
          </div>
        </div>
        <div className={`custom-row`}>
          <div className="col_12 col_xl_3 col_lg_12">
            <button className={style.searchButton} onClick={() => setActiveFilter(!activeFilter)}>
              <Image src={"/assets/svg/filter.svg"}
                alt='bg-img'
                width={30}
                height={30}
                className={style.filterSvg}
              />
              <span>Filter</span>
            </button>

            <div className={`${style.filterCuisines} ${activeFilter ? style.active : ""}`}>
              <div className={style.filterHeader}>
                <Image src={"/assets/svg/cross.svg"}
                  alt='bg-img'
                  width={30}
                  height={30}
                  className={style.svgStyle}
                  onClick={() => setActiveFilter(false)}
                />
                <h3 className={`h3 ${style.searchHead}`}>{sortHeading}</h3>
                <div className={`${style.filterItem}`}>
                  <div className={`${style.inputContainer}`}>
                    <form onSubmit={onSearch}>
                      <input
                        onChange={(e) => {
                          setState((prevState) => ({
                            ...prevState,
                            searchQuery: e.target.value.toLowerCase(),
                          }));
                        }}
                        type="text"
                        placeholder="Search"
                        className={style.inputSearch}
                      />
                      <button className={style.submitButton} type="submit">
                        <SvgComp src={searchIcon} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <form>
                <div className={style.searchWrapper}>
                  {state?.filterCategory?.map((category: any, i: number) => (
                    <div className={`${style.checboxitem}`} key={i}>
                      <label>
                        <div className={style.checkboxWrapper}>
                          <Image
                            src={category?.attributes?.logo?.data?.attributes?.url}
                            alt={category?.attributes?.title ? category?.attributes?.title : "Image"}
                            width={50}
                            height={50}
                          />
                          <input
                            onChange={handleFilterChange}
                            type="checkbox"
                            value={category?.attributes?.title}
                          />
                          <h5 className={style.checkboxName}>
                            {category?.attributes?.title}
                          </h5>
                        </div>
                        <SvgComp src={rightIcon} />
                      </label>
                    </div>
                  ))}
                </div>
              </form>
              <button className={style.filterSet} onClick={(e:any) => {
                setActiveFilter(false)
                onSearch(e)
              }}>Save</button>
            </div>
          </div>

          {!state.loading ? (
            <div className="col_12 col_xl_9 col_lg_12">
              <InfiniteScroll
                dataLength={state?.dishes?.length}
                next={getMoreBrands}
                hasMore={state.hasMore}
                loader={<LoadingComponent />}
              >
                <div className={`custom-row ${style.rowCustom}`}>
                  {state?.dishes?.length > 0 ? (
                    state?.dishes?.map((resp: any, index: number) => {
                      const destructData = {
                        img: resp?.attributes?.brandInfoImgUrl,
                        logo: resp?.attributes?.logoUrl,
                        type: resp?.attributes?.type,
                        slug: resp?.attributes?.slug,
                        subCategory: resp?.attributes?.brand_categories?.data[0]?.attributes?.slug,
                      };
                      return (
                        <div key={index} className="col_6 col_xl_4 col_lg_6 col_md_6">
                          <BrandCard category="eat" {...destructData} />
                        </div>
                      );
                    })
                  ) : (
                    <div className="col_12">
                      <Empty />
                    </div>
                  )}
                </div>
              </InfiniteScroll>
            </div>
          ) : (
            <div className="col_12 col_xl_9 col_lg_12">
              <PageLoader />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CuisinesListing;
