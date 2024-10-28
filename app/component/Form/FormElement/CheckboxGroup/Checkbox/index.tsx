import React from "react";
import style from "./Checkbox.module.scss";
import SVG from "react-inlinesvg";
import Link from "next/link";
import checkedIcon from "../../../../../../public/assets/svg/checked.svg";
import rightIcon from "../../../../../../public/assets/svg/right-chevron.svg";
import SvgComp from "@/app/component/SvgComp";

const Checkbox = (props: any) => {
  return (
    <label
      htmlFor={props.name}
      className={`${style["checkbox"]} ${style[props.exclass]}`}
    >
      <div className={style.checkWrapper}>
        <div className={`${style.checkboxContainer}`}>
          <div className={style["inputWrapper"]}>
            <input
              id={props.name}
              type="checkbox"
              aria-label={props.label}
              {...props.field}
              value={props.value}
              checked={props.value == props.field.value}
            />
            {props.icon ? (
              <div className={`${style["customCheckbox"]}`}>
                <SvgComp src={checkedIcon} />
              </div>
            ) : (
              ""
            )}
          </div>
          <p className={`${props.bold ? style.boldText : ""}`}>{props.label}</p>
        </div>
        {props.forget ? (
          <Link className={style.forgetLink} href={"/forgot-password"}>
            Forgot Password
          </Link>
        ) : (
          ""
        )}
      </div>
      {props.filterCheckbox ? (
        <SVG src={rightIcon} width={13} height={13} />
      ) : (
        ""
      )}
    </label>
  );
};

export default Checkbox;
