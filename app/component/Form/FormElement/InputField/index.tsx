import SvgComp from "@/app/component/SvgComp";
import ct from "react";
import { Controller } from "react-hook-form";
import style from "./inputField.module.scss";
import Image from "next/image";

const InputField = (props: any) => {
  return (
    <div className={`input-container`}>
      <div
        className={`input-wrapper ${style.inputContainer} ${
          style[props.class]
        }`}
      >
        <Controller
          name={props.name}
          control={props.control}
          render={({ field: { value, onChange } }) => {
            return (
              <>
                {}
                {props.brandGallery ? (
                  <div
                    className={`${style[props.customClass]} ${
                      style.labelUpper
                    }`}
                  >
                    {props.brandGalleryText}
                  </div>
                ) : (
                  ""
                )}

                {props.label ? (
                  <div
                    className={`${style[props.customClass]} ${style.label} ${
                      style[props.class]
                    } ${
                      props.dashboardCustom ? style.dashboardInputLabel : ""
                    }`}
                  >
                    {props.inputLabel}
                  </div>
                ) : (
                  ""
                )}
                {/* dashboard brandinfo props */}

                {props.class === "customLogo" || "galleryInput" ? (
                  <div
                    className={`${style[props.class + "Upload"]} ${
                      style.uploadLabel
                    }`}
                  >
                    <label className={style.labelUpload} htmlFor={props.id}>
                      {props.class === "galleryInput" ? "Upload Images" : value}
                    </label>
                    <div className={style.buttonContainer}>
                      <label className={style.buttonUpload} htmlFor={props.id}>
                        Upload Image
                      </label>
                      <button
                        type="button"
                        onClick={props.removeLogo}
                        className={style.buttonRemove}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* dashboard brandinfo props end*/}
                <div
                  className={` ${
                    props.class === "fillupForm" ? style.fillUpForm : ""
                  } ${props.icon ? style[props.customClass] : ""}`}
                >
                  {props.icon ? (
                    <div
                      className={`${props.icon ? style[props.name] : ""} ${
                        style.svgWrapper
                      }`}
                    >
                      {" "}
                      <SvgComp src={props.iconUrl} />{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  <input
                    id={props.id}
                    value={value}
                    type={props.type}
                    placeholder={props.placeholder}
                    className={`input ${style.customInput}  ${
                      style[props.customClass]
                    } ${props.dashboardCustom ? style.dashboardInput : ""} ${
                      props.customLogo === "customLogo" ? style.typeFile : ""
                    } ${
                      props.class === "galleryInput"
                        ? style[props.class + "brand"]
                        : ""
                    }`}
                    onChange={(e) => {
                      onChange(e);
                      props.onChange && props.onChange(e);
                    }}
                    readOnly={props.readOnly}
                    multiple={props.brandGallery ? true : false}
                  />
                </div>
                {/* dashboard brandinfo props */}
                {props.bottomLabel ? (
                  <div className={`${style.label}`}>{props.bottomLabel}</div>
                ) : (
                  ""
                )}
                {/* dashboard brandinfo props end*/}

                {/* {props.customClass ? <SvgComp src={'/assets/svg/search.svg'} /> : ""} */}
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default InputField;
