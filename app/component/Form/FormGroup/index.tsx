import React from "react";
import { useRouter } from "next/navigation";
import style from "./form-group.module.scss";
import InputField from "../FormElement/InputField";
import SelectField from "../FormElement/SelectField";
import TextAreaField from "../FormElement/TextAreaField";
import CheckboxGroup from "../FormElement/CheckboxGroup";
import RadioGroup from "../FormElement/RadioGroup";
import DateField from "../FormElement/DateField";
import UploadFile from "../FormElement/UploadFile";
import InputPhone from "../FormElement/InputPhone";
import RatingInput from "../FormElement/Rating";
import dynamic from "next/dynamic";
const CKeditorField = dynamic(() => import("../FormElement/CKEditorField"), { ssr: false });

const FormGroup = (props: any) => {
  const router = useRouter();
  const { item, control, errors, getValues, setValue, images, resetTrigger } =
    props;

  return (
    <>
      {item.heading && (
        <div className={`col_12 col_xl_12`}>
          {item.heading ? (
            <h6
              className={` ${style.updateBrands} ${style[item.searchCustom]} `}
            >
              {item.headingText}
            </h6>
          ) : (
            ""
          )}
        </div>
      )}

      {item.type == "input" && (
        <div
          className={`col_12  ${item.width == "fullWidth" ? "col_md_12" : "col_md_6"
            } ${item.padding === "nopadding" ? style.noPadding : ""}  ${style["form-group"]
            } ${errors[`${item.name}`] ? "border-red" : ""}  ${item.customPadding === "cuisine" ? style.paddingCuisine : ""
            } form-group`}
        >
          <InputField
            name={item.name}
            control={control}
            placeholder={item.placeholder || ""}
            type={item.inputtype || ""}
            class={item.exclass || ""}
            eye={item.eye}
            req={item.req}
            editEnable={item.editEnable}
            readOnly={item.readOnly}
            onChange={item.onChange}
            customClass={item.searchCustom}
            label={item.label}
            dashboardCustom={item.dashboardCustom}
            inputLabel={item.inputLabel}
            bottomLabel={item.bottomLabel}
            id={item.id}
            heading={item.heading}
            headingText={item.headingText}
            icon={item.icon}
            iconUrl={item.iconUrl}
            brandGallery={item.brandGallery}
            brandGalleryText={item.brandGalleryText}
            removeLogo={item.removeLogo}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
          {item.bottomAnchor && (
            <div className="anchorWrapper d-flex justify-end mt-11  ">
              <button
                type={"button"}
                onClick={() => {
                  router.push(`${item.bottomAnchorLink}`);
                }}
                className="graycol w-uline"
              >
                {item.bottomAnchor}
              </button>
            </div>
          )}
        </div>
      )}

      {item.type == "textarea" && (
        <div
          className={`col_12 col_md_12 ${style["form-group"]} ${errors[`${item.name}`] ? "border-red" : ""
            } form-group outlet-container`}
        >
          <TextAreaField
            name={item.name}
            control={control}
            placeholder={item.placeholder || ""}
            class={item.exclass || ""}
            rows={item.rows}
            col={item.col}
            req={item.req}
            label={item.label}
            inputLabel={item.inputLabel}
            customClass={item.customClass}
            heading={item.heading}
            onChange={item.onChange}
            bottomLabel={item.bottomLabel}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}


      {item.type == "select" && (
        <div
          className={`col_12 col_md_6  ${style["form-group"]} ${errors[`${item.name}`] ? "border-red" : ""
            } ${item.width == "fullWidth" ? "col_md_12 mb-3" : "col_md_6"} ${item.padding === "nopadding" ? style.noPadding : ""
            } ${item.margin === "nomargin" ? style.noMargin : ""} form-group`}
        >
          <SelectField
            name={item.name}
            control={control}
            label={item.label}
            placeholder={item.placeholder || ""}
            labelShow={item.labelShow}
            selectLabel={item.selectLabel}
            static={item.static}
            options={item?.options?.map((x: any) => {
              return {
                label: x?.name,
                value: x?.id,
              };
            })}
            exclass={item.exclass}
            heading={item.heading}
            noborder={item.noborder}
            error={errors[`${item.name}`]}
            disabled={item.disabled}
            onChange={item.onChange}
            multiple={item.multiple}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
      {item.type == "checkbox" && (
        <div
          className={`form-group col_12 ${item.border ? style.borderCustom : ""
            } ${item.padding === "nopadding" ? style.noPadding : ""} ${item.width == "fullWidth" ? "col_md_12" : "col_md_6"
            } `}
        >
          <CheckboxGroup
            name={item.name}
            control={control}
            options={item.options}
            bold={item.bold}
            exclass={item.exclass}
            icon={item.icon}
            filterCheckbox={item.filterCheckbox}
            heading={item.heading}
            forget={item.forget}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
      {item.type == "radio" && (
        <div
          className={`form-group col_12  ${style.customRadio} ${item.width == "col_md_9" ? "col_md_9" : "col_md_12"
            } ${item.padding === "nopadding" ? style.noPadding : ""}`}
        >
          <RadioGroup
            name={item.name}
            control={control}
            options={item.options}
            onChange={item.onChange}
            heading={item.heading}
            init={item.init}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
      {item.type == "date" && (
        <div
          className={`form-group col_12 ${style["form-group"]} ${item.width == "fullWidth" ? "col_md_12 mb-3" : "col_md_6"
            } ${item.padding === "nopadding" ? style.noPadding : ""} ${errors[`${item.name}`] ? "border-red" : ""
            }`}
        >
          <DateField
            name={item.name}
            control={control}
            placeholder={item.placeholder || ""}
            label={item.label}
            class={item.exclass || ""}
            heading={item.heading}
            onChange={item.onChange}
            isTime={item.time}
            inputLabel={item.inputLabel}
            rangePicker={item.rangePicker}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
      {item.type == "upload" && (
        <div
          className={`col_12 col_md_12  ${item.width == "fullWidth" ? "col_lg_12" : "col_lg_6"
            } ${item.padding === "nopadding" ? style.noPadding : ""}  ${style["form-group"]
            } ${errors[`${item.name}`] ? "border-red upload-input" : ""}  ${item.customPadding === "cuisine" ? style.paddingCuisine : ""
            } form-group`}
        >
          <UploadFile
            name={item.name}
            control={control}
            placeholder={item.placeholder || ""}
            class={item.exclass || ""}
            req={item.req}
            customClass={item.searchCustom}
            label={item.label}
            dashboardCustom={item.dashboardCustom}
            inputLabel={item.inputLabel}
            bottomLabel={item.bottomLabel}
            id={item.id}
            images={images}
            heading={item.heading}
            headingText={item.headingText}
            icon={item.icon}
            iconUrl={item.iconUrl}
            brandGallery={item.brandGallery}
            brandGalleryText={item.brandGalleryText}
            getValues={getValues}
            setValue={setValue}
            thumb={item.thumb}
            inputBottom={item.inputBottom}
            isOnchange={item.isOnchange}
            resetTrigger={resetTrigger}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
      {item.type == "tel" && (
        <div
          className={`${style["form-group"]} col_12 ${item.width == "fullWidth" ? "col_md_12" : "col_md_6"
            } ${errors[`${item.name}`] ? "border-red" : ""} form-group`}
        >
          <InputPhone
            name={item.name}
            control={control}
            placeholder={item.placeholder || ""}
            class={item.exclass || ""}
            disabled={item.disabled}
            editEnable={item.editEnable}
            readOnly={item.readOnly}
            label={item.label}
            heading={item.heading}
            inputLabel={item.inputLabel}
          />

          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
      {item.type == "rating" && (
        <div
          className={`col_12 col_md_12 ${style.ratingGroup} ${style["form-group"]
            } ${errors[`${item.name}`] ? "border-red" : ""} form-group`}
        >
          <RatingInput
            name={item.name}
            control={control}
            class={item.exclass || ""}
            onChange={item.onChange}
            readonly={item.readonly}
            heading={item.heading}
          />

          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}

      {item.type == "ckeditorfield" && (
        <div
          className={`col_12 col_md_12 ${style["form-group"]} ${errors[`${item.name}`] ? "border-red" : ""
            } form-group outlet-container`}
        >
          <CKeditorField
            name={item.name}
            control={control}
            placeholder={item.placeholder || ""}
            class={item.exclass || ""}
            req={item.req}
            label={item.label}
            inputLabel={item.inputLabel}
            customClass={item.customClass}
            onChange={item.onChange}
            bottomLabel={item.bottomLabel}
          />
          {errors[`${item.name}`] && (
            <span className="error">{errors[`${item.name}`]?.message}</span>
          )}
        </div>
      )}
    </>
  );
};

export default FormGroup;
