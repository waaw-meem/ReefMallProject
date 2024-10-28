import SvgComp from "@/app/component/SvgComp";
import React, { memo, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import style from "./uploadField.module.scss";
import Image from "next/image";
import removeIcon from "../../../../../public/assets/svg/trash.svg";
import { toast } from "react-toastify";

const UploadFile = (props: any) => {
  const {
    setValue,
    getValues,
    name,
    id,
    placeholder,
    bottomLabel,
    images,
    brandGallery,
    brandGalleryText,
    control,
    label,
    thumb,
    isOnchange = false,
    resetTrigger = false,
  } = props;

  const [uFile, setUFile] = useState<any>([]);
  console.log(brandGallery, images, resetTrigger, "images brandGallery");

  // console.log(images, "images");
  useEffect(() => {
    // let dataImages = getValues(name);
    // console.log("name", name);

    // console.log("dataImages", dataImages);

    if (images && images?.length > 0) {
      setUFile([...images]);
    }
  }, [images]);

  useEffect(() => {
    if (uFile && uFile?.length > 0) {
      console.log("HI", { name, uFile });

      setValue(`${name}`, uFile);
    }
  }, [uFile]);

  // Add useEffect to handle reset
  useEffect(() => {
    if (resetTrigger) {
      setUFile([]);
    }
  }, [resetTrigger]);

  const remove = (indexToRemove: number) => {
    setUFile((prevFiles: any) => {
      const updatedFiles = prevFiles.filter(
        (_: any, index: number) => index !== indexToRemove
      );
      setValue(`${name}`, updatedFiles);
      return updatedFiles;
    });
  };

  // const handleFileChange = (fileList: any, fieldname: any) => {
  //   const selectedFiles = Array.from(fileList);
  //   if (brandGallery) {
  //     let files = [...selectedFiles];
  //     console.log(files, "from brand list");
  //     setUFile((prev: any) => [...prev, ...files]);
  //     return;
  //   }
  //   setUFile(selectedFiles);
  // };

  const handleFileChange = (fileList: any, fieldname: any) => {
    const selectedFiles = Array.from(fileList);
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFiles = selectedFiles.filter(
      (file: any) => !allowedFileTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error("Only PNG, JPG, and JPEG files are allowed.");
      return;
    }

    if (brandGallery) {
      let files = [...selectedFiles];
      console.log(files, "from brand list");
      setUFile((prev: any) => [...prev, ...files]);
      return;
    }

    setUFile(selectedFiles);
  };

  return (
    <div className={`input-container`}>
      <div
        className={`input-wrapper ${style.inputContainer} ${
          style[props.class]
        }`}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={[]}
          render={({ field: { value, onChange } }: any) => {
            return (
              <>
                {brandGallery ? (
                  <div
                    className={`${style[props.customClass]} ${
                      style.labelUpper
                    }`}
                  >
                    {brandGalleryText}
                  </div>
                ) : (
                  ""
                )}

                {label ? (
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
                {props.inputBottom ? (
                  <div
                    className={`${style[props.customClass]} ${style.label} ${
                      style[props.class]
                    } ${
                      props.dashboardCustom ? style.dashboardInputLabel : ""
                    }`}
                  >
                    {props.inputBottom}
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
                    <label
                      className={`${style.labelUpload} red-label-upload`}
                      htmlFor={props.id}
                    >
                      {props.class === "galleryInput"
                        ? "Upload Image"
                        : value[0]?.name}
                    </label>
                    <div className={style.buttonContainer}>
                      <label className={style.buttonUpload} htmlFor={props.id}>
                        Upload Image
                      </label>
                      <button
                        type="button"
                        onClick={() => remove(0)}
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
                  className={` ${props.icon ? style[props.customClass] : ""}`}
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
                    id={id}
                    type="file"
                    placeholder={placeholder}
                    className={`input ${style.customInput}  ${
                      style[props.customClass]
                    } ${props.dashboardCustom ? style.dashboardInput : ""} ${
                      props.customLogo === "customLogo" ? style.typeFile : ""
                    } ${
                      props.class === "galleryInput"
                        ? style[props.class + "brand"]
                        : ""
                    }`}
                    onChange={(e: any) => {
                      handleFileChange(e.target.files, name);
                      isOnchange ? "" : onChange(e.target.files);
                    }}
                    multiple={brandGallery ? true : false}
                  />
                </div>
                {bottomLabel ? (
                  <div className={`${style.label}`}>{bottomLabel}</div>
                ) : (
                  ""
                )}
              </>
            );
          }}
        />
        {thumb && uFile.length ? (
          <div className={style.imgWrapper}>
            {uFile.map((item: any, i: number) => {
              console.log(uFile, "images");
              return (
                <div key={i} className={style.imgBox}>
                  <Image
                    src={
                      item?.type === "url"
                        ? item?.url
                        : URL?.createObjectURL(item)
                    }
                    alt=""
                    height={223}
                    width={181}
                  />
                  <button
                    type="button"
                    className={`${style.delete}  ${style.button}`}
                    onClick={() => remove(i)}
                  >
                    <SvgComp src={"/assets/svg/trash.svg"} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default memo(UploadFile);
