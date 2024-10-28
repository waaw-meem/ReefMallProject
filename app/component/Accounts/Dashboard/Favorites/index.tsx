"use client";

import React, { useEffect } from "react";
import style from "./index.module.scss";
import Image from "next/image";
import SvgComp from "@/app/component/SvgComp";
import {
  useLazyGetAllFavsQuery,
  useRemoveFavMutation,
} from "@/redux/reducers/customerApiSlice/CustomerApiSlice";
import { useSession } from "next-auth/react";
import SpinLoader from "@/app/component/Loader/SpinLoader";
import { toast } from "react-toastify";
import trashIcon from "../../../../../public/assets/svg/trash.svg";
import { useRouter } from "next/navigation";

const Favorites = () => {
  const { data: session } = useSession();
  const [getAllFavs, { data: favourites, error, isLoading: getLoading }] =
    useLazyGetAllFavsQuery();
  const [removeFav, { isLoading }] = useRemoveFavMutation();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      getAllFavs(session?.user);
    }
  }, [session]);

  if (session?.user?.type === "vendor") {
    router.push("/user-profile");
  }

  const data = [
    {
      name: "h&m",
      src: "/assets/images/dashboard/hnm.png",
    },
    {
      name: "bench",
      src: "/assets/images/dashboard/bench.png",
    },
    {
      name: "levis",
      src: "/assets/images/dashboard/levis.png",
    },
    {
      name: "ardene",
      src: "/assets/images/dashboard/ardene.png",
    },
    {
      name: "levantino",
      src: "/assets/images/dashboard/levantino.png",
    },
    {
      name: "clarks",
      src: "/assets/images/dashboard/clarks.png",
    },
  ];

  const handleRemove = async (bid: any) => {
    try {
      let payload = {
        user: session?.user,
        bid,
      };
      const response = await removeFav(payload).unwrap();
      toast.success("Favourite removed successfully");
      getAllFavs(session?.user);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (getLoading) return <SpinLoader size={"small"} />;
  if (error) return <p>Something went wrong</p>;
  if (
    !favourites?.favourite_brands ||
    favourites?.favourite_brands?.length === 0
  )
    return (
      <section className="dashboard-container">
        <div className="dashboard-card">
          <h5>No Favourites</h5>
        </div>
      </section>
    );
  return (
    <section className="dashboard-container">
      <div className="dashboard-card">
        <div className={style.FavoriteWrapper}>
          {favourites?.favourite_brands?.map((favourite: any) => {
            let logo = favourite?.BrandInfoDetails?.logo;
            let bid = favourite?.id;
            return (
              <div key={favourite?.id} className={style.brandCard}>
                <button
                  className={style.deleteWrapper}
                  onClick={() => handleRemove(bid)}
                >
                  <SvgComp src={trashIcon} />
                </button>
                <Image
                  alt=""
                  src={logo || "/assets/images/NotFound.jpg"}
                  width={188}
                  height={107}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
