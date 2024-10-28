"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import style from "./index.module.scss";
import SvgComp from "@/app/component/SvgComp";
import { useUploadImageMutation } from "@/redux/reducers/UploadSlice/UploadApiSlice";
import {
  useUpdateUserProfileMutation,
  useUserProfileQuery,
} from "@/redux/reducers/UserSlice/UserApiSlice";
import SpinLoader from "@/app/component/Loader/SpinLoader";
import { toast } from "react-toastify";
import editIcon from "../../../../../public/assets/svg/dashboard/edit.svg";
import ImageAndName from "./ImageAndName";
import SingleFieldEmail from "./SingleFieldEmail";
import SingleFieldPhone from "./SingleFieldPhone";
import SingleFieldPassword from "./SingleFieldPassword";

const UserProfile = () => {
  const { data, error, isLoading, refetch } = useUserProfileQuery();

  const handleRefetch = useCallback(() => {
    refetch();
  }, []);

  if (isLoading) return <SpinLoader size={"large"} />;
  if (error) return <p>Something went wrong</p>;

  return (
    <section className="dashboard-container">
      <div className="dashboard-card">
        <div className={`user-profile-form ${style.userProfile}`}>
          <div className={style.bannerWrapper}>
            <Image
              alt=""
              src={"/assets/images/dashboard/user-profile.jpg"}
              width={1485}
              height={223}
            />
          </div>
          <div className={style.userInfoWrapper}>
            {/* <ImageAndName refetch={handleRefetch} init={{ username: data?.username || '', profileImg: data?.profileImg || null }} /> */}
            <ImageAndName
              refetch={handleRefetch}
              init={{
                username: data?.fullName || "",
                profileImg: data?.profileImg || null,
              }}
            />
            <SingleFieldEmail
              refetch={handleRefetch}
              init={{ email: data?.email || "" }}
            />
            <SingleFieldPhone
              refetch={handleRefetch}
              init={{ phoneNumber: data?.phoneNumber || "" }}
            />
            <SingleFieldPassword />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
