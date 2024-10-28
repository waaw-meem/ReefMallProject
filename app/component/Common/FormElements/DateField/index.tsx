"use client";
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import SvgComp from "../../SvgComp";

import { Controller } from "react-hook-form";

import calendarIcon from "../../../../../public/assets/svg/calendar.svg"
import clockIcon from "../../../../../public/assets/svg/time-clock.svg"


import style from "./datePicker.module.scss";
import "react-datepicker/dist/react-datepicker.css";


const DateField = (props: any) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Wali
  const [selectedDate, setSelectedDate] = useState(new Date());

  
  const datepickerRef = useRef(null);
  function handleClickDatepickerIcon() {
    const datepickerElement: any = datepickerRef.current;
    datepickerElement.setFocus(true);

  }

  const onDatepickerRef = (el: any) => {
    if (el && el?.input) {
      el.input.readOnly = true;
    }
  }

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange } }) => {


        return (
          <div className={"input-container"}>
            <div
              className={`${style.inputWrapperDate}`}
            >
              <>
                {props.label ? (
                  <div className={`${style.label}  ${style[props.class]}`}>
                    {props.inputLabel}
                  </div>
                ) : (
                  ""
                )}
                {props.isTime ? (
                  <DatePicker
                    selected={value || selectedDate} // Wali
                    // selected={value}
                    className={`date-field ${style.datePicker} `}
                    placeholderText={props.placeholder}
                    ref={(e: any) => {
                      datepickerRef
                      onDatepickerRef(e)
                    }}
                    onChange={(e: any) => {
                      setSelectedDate(e || new Date()); // Wali
                      onChange(e);
                      props.onChange && props.onChange(e);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="hh:mm a"
                    onFocus={(e: any) => e.target.blur()}
                    inputmode='none'
                  />
                ) : props.rangePicker ? (
                  <DatePicker
                    className={`date-field ${style.datePicker}`}
                    placeholderText={props.placeholder}
                    ref={(e: any) => {
                      datepickerRef
                      onDatepickerRef(e)
                    }}
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    isClearable={false}
                    onFocus={(e: any) => e.target.blur()}
                    inputmode='none'
                    onChange={(e: any) => {
                      console.log(e);
                      onChange(e);
                      setDateRange(e);
                      props.onChange && props.onChange(e);
                    }}
                  />
                ) : (
                  <DatePicker
                    selected={value}
                    className={`date-field ${style.datePicker}`}
                    placeholderText={props.placeholder}
                    ref={(e: any) => {
                      datepickerRef
                      onDatepickerRef(e)
                    }}
                    onFocus={(e: any) => e.target.blur()}
                    inputmode='none'
                    onChange={(e: any) => {
                      onChange(e);
                      props.onChange && props.onChange(e);
                    }}
                  />
                )}

                <span
                  className={style.dateIcon}
                  // onClick={() => handleClickDatepickerIcon()}
                >
                  {props.isTime ? (
                    <SvgComp src={clockIcon} />
                  ) : (
                    <SvgComp src={calendarIcon} />
                  )}
                </span>
              </>
            </div>
          </div>
        );
      }}
    />
  );
};

export default DateField;
