"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import style from "./index.module.scss";
import SearchTabs from "../SearchTab";
import SearchCard from "../SearchCards";
import LoadingComponent from "../Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchByUserMutation } from "@/redux/reducers/SearchSlice/SearchApiSlice";

const SearchComp = () => {
  const [tab, setTab] = useState("brand");
  const [load, setLoad] = useState(false);
  const { data: session } = useSession();
  const [saveSearch] = useSearchByUserMutation();

  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search");
  const [searchQuery, setSearchQuery] = useState(search || "");
  const [res, setRes] = useState<any>({
    brand: [],
    "brand-offer": [],
    event: [],
    "service-card": [],
  });

  const [data1, setData1] = useState<any>({
    brand: [],
    "brand-offer": [],
    event: [],
    "service-card": [],
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchQuery?.length > 0) {
      if (session) {
        const payload = {
          data: {
            keyword: `${searchQuery}`,
            user: {
              connect: [{ id: `${session?.user?.id}` }],
            },
          },
        };

        saveSearch(payload);
      }
      router.push(`/search?search=${searchQuery}`);
      //   fetchData();
      //   setSearch(searchQuery);
    }

    // fetchData();
  };

  const fetchData = async () => {
    setLoad(true);
    try {
      const accumulatedOtherHits: any = {
        brand: [],
        "brand-offer": [],
        event: [],
        "service-card": [],
      };

      for (const data of Object.keys(res)) {
        let attributes = "";
        switch (data) {
          case "brand":
            attributes = "title";
            break;
          case "brand-offer":
            attributes = "title";
            break;
          case "event":
            attributes = "title";
            break;
          case "service-card":
            attributes = "title";
            break;
          default:
            break;
        }

        let response;
        response = await fetch(
          `${process.env.MEILI_SEARCH_ENDPOINT}/indexes/${data}/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.MEILI_SEARCH_KEY}`,
            },
            body: JSON.stringify({
              attributesToSearchOn: [attributes],
              q: `${search}`,
            }),
          }
        );

        const res = await response.json();
        //   const titlesToCheck = ["cinema", "virtual reality", "kids game"];

        //   const magicPlanetHits: any = [];
        const otherHits: any = [];

        res?.hits?.forEach((hit: any) => {
          // const hasMatchingSubCategory = hit?.sub_categories?.some(
          //   (subCategory: any) =>
          //     subCategory?.title &&
          //     entertainmentSubcategories?.includes(
          //       subCategory?.title?.toLowerCase()
          //     )
          // );

          // if (hasMatchingSubCategory) {
          //   magicPlanetHits.push(hit);
          // } else {
          otherHits.push(hit);
          // }
        });

        //   accumulatedMagicPlanetHits.push(...magicPlanetHits);
        accumulatedOtherHits[data].push(...otherHits);
      }

      setData1((prevState: any) => ({
        ...prevState,
        ...accumulatedOtherHits,
      }));

      setRes((prevState: any) => ({
        ...prevState,
        ...accumulatedOtherHits,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoad(false);
    }
  };

  const select = (e: any) => {
    setTab(e);
  };

  useEffect(() => {
    if (search) {
      fetchData();
    }
  }, [search]);

  return (
    <section className={`section ${style.searchSection}`}>
      <div className="container">
        <div className={style.searchInputContainer}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Brands"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className={style.searchButton}>
              <span>Search</span>
            </button>
          </form>
        </div>
        <div className={style.searchCardWrapper}>
          <SearchTabs select={select} tab={tab} data={res} />
          {load ? <LoadingComponent /> : <SearchCard tab={tab} data={res} />}
        </div>
      </div>
    </section>
  );
};

export default SearchComp;
