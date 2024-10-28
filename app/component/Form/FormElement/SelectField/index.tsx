import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import SVG from "react-inlinesvg";
import style from "./index.module.scss"
import dropdownIcon from "../../../../../public/assets/svg/arrow-down.svg"

const DropdownIndicator = () => {
  return (
    <>
      <SVG src={dropdownIcon} />
    </>
  );
};

const SelectField = (props: any) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange, onBlur } }) => {
        return (
          <>
            {props.labelShow ? <div className={style.selectLabel}>{props.selectLabel}</div> : ""}
            <Select
              options={props.options}
              components={{ DropdownIndicator }}
              placeholder={props.placeholder}
              onChange={(options: any) => { onChange(options); props.onChange && props.onChange(options) }}
              onBlur={onBlur}
              id="selectbox"
              instanceId="selectbox"
              value={value}
              defaultValue={value}
              isMulti={props.multiple ? true : false}
              isDisabled={props.disabled ? true : false}
              isClearable={props.clearable ? true : false}
              isSearchable={props.search ? true : false}
              className="custom__select irman"
              classNamePrefix="custom__select"
              styles={{
                control: (val, state) => ({
                  ...val,
                  minHeight: "4.125em",
                  borderRadius: "0.3125em",
                  cursor: "pointer",
                  borderColor: `${props.error ? "red" : "rgba(var(--color-inputborder), 0.5)"
                    }`,
                  backgroundColor: "var(--color-whitecol)",
                  "&:hover": {
                    borderColor: "rgba(var(--color-inputborder), 0.5)",
                  },
                  paddingRight: "1.375em",
                  paddingLeft: "1.275em",
                  boxShadow: "none",
                }),
                valueContainer: (vcontain) => ({
                  ...vcontain,
                  fontSize: "1.125em",
                  textTransform: "capitalize",
                  color: "var(--color-blackcol)",
                  padding: "0",
                }),
                singleValue: (scontain) => ({
                  ...scontain,
                  color: "var(--color-blackcol)",
                  //padding: '0.875em',
                }),

                indicatorSeparator: (icontain) => ({
                  ...icontain,
                  backgroundColor: "transparent",
                }),
                dropdownIndicator: (dcontain) => ({
                  ...dcontain,
                }),
                option: (vcontain, state) => ({
                  ...vcontain,
                  textTransform: "capitalize",
                  cursor: "pointer",

                  color: state.isFocused
                    ? "var(--color-graycol)"
                    : "var(--color-graycol)",
                  backgroundColor: state.isFocused
                    ? "var(--color-gray3)"
                    : "var(--color-whitecol)",
                }),
                menu: (styles) => ({
                  ...styles,
                  zIndex: 99,
                  minHeight: "auto",
                }),
                placeholder: (place) => ({
                  ...place,
                  color: "#858585",
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: "#262b2b",
                  primary50: "rgba('#262b2b', 0.5')",
                  primary25: "rgba('#262b2b', 0.25')",
                },
              })}
            />
          </>

        );
      }}
    />
  );
};

export default SelectField;
