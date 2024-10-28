import React from "react";
import style from "./index.module.scss";
import SvgComp from "../../../SvgComp";
import { signOut } from "next-auth/react";
import logoutIcon from "../../../../../public/assets/svg/logout.svg";

type headerProps = {
  toggle: any;
};

const DashboardHeader = ({ toggle }: headerProps) => {
  return (
    <div className={style.header}>
      <div className={style.titleWrapper}>
        <h4 className={style.title}>Dashboard</h4>
      </div>
      <div>
        <button
          type="submit"
          className={style.gradientButton}
          onClick={() => {
            sessionStorage.removeItem("bid");
            sessionStorage.removeItem("brandSlug");
            localStorage?.removeItem("user");

            signOut({ callbackUrl: "/sign-in" });
          }}
        >
          <SvgComp src={logoutIcon} />
          <span className={style.btn}>{"Logout"}</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
