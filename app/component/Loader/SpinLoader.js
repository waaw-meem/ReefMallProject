import React from "react";
import style from "./index.module.scss";
import { TailSpin } from "react-loader-spinner";

export default function SpinLoader({ size, color = "black" }) {
  return (
    <div className={style.loaderWrapper}>
      <TailSpin
        visible={true}
        height={size == "small" ? "20" : "40"}
        width={size == "small" ? "20" : "40"}
        color={color == "white" ? "#fff" : "#c183b9"}
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass="spinner-wrapper"
      />
    </div>
  );
}
