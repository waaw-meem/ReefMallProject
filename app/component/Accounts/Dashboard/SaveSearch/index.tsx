"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import style from "./index.module.scss";
import React, { useEffect } from "react";
import { useGetSaveSearchByUserQuery } from "@/redux/reducers/SearchSlice/SearchApiSlice";
import moment from "moment";
import LoadingComponent from "@/app/component/Loading";

const SaveSearch = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { data, isFetching } = useGetSaveSearchByUserQuery(session?.user?.id);

  return (
    <section className="dashboard-container">
      <div className="dashboard-card">
        <h5>Save Search</h5>
        <ul className={style.ulStyle}>
          {isFetching ? (
            <LoadingComponent />
          ) : data?.data && data?.data.length > 0 ? (
            data?.data.map((result: any) => (
              <li key={result.id} className={style.linkStyle}>
                <Link href={`/search?search=${result?.attributes?.keyword}`}>
                  <p>
                    {result?.attributes?.keyword} -{" "}
                    {moment(result?.attributes?.updatedAt).format("LT") +
                      ", " +
                      moment(result?.attributes?.updatedAt).format("LL")}
                  </p>
                </Link>
              </li>
            ))
          ) : (
            <p>No History Found</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default SaveSearch;
