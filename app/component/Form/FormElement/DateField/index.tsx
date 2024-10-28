"use client";
import SvgComp from "@/app/component/SvgComp";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import clockIcon from "../../../../../public/assets/svg/clock.svg";
import calendarIcon from "../../../../../public/assets/svg/calendar.svg";

import style from "./datePicker.module.scss";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateField = (props: any) => {
  // console.log(props.control, "police123");
  const datepickerRef = useRef(null);
  function handleClickDatepickerIcon() {
    const datepickerElement: any = datepickerRef.current;
    // console.log("datepickerElement = ", datepickerElement);
    datepickerElement.setFocus(true);
  }
  useEffect(() => {}, []);
  const setTime = (date: any, hours: any, minutes: any) => {
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  };

  const minTime = setTime(
    new Date(),
    new Date().getHours(),
    new Date().getMinutes()
  );

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { value, onChange } }) => {
        const initialRange = [
          value && value[0] ? moment(value[0]).format("YYYY-MM-DD") : null,
          value && value[1] ? moment(value[1]).format("YYYY-MM-DD") : null,
        ];
        const [dateRange, setDateRange] = useState(initialRange);
        // console.log(props, "date pciker props");
        // console.log(value, "police123");

        useEffect(() => {
          if (value) {
            setDateRange([
              value[0] ? value[0] : null,
              value[1] ? value[1] : null,
            ]);
          }
        }, [value]);

        const [startDate, endDate] = dateRange;
        return (
          <div className={"input-container"}>
            <div
              className={`${style.inputWrapperDate} ${
                props.class === "fillupForm" ? "fill-up-form" : ""
              }`}
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
                    selected={value}
                    className={`date-field ${style.datePicker} `}
                    placeholderText={props.placeholder}
                    ref={datepickerRef}
                    onChange={(e: any) => {
                      onChange(e);
                      props.onChange && props.onChange(e);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    minTime={setTime(new Date(), 8, 0)}
                    maxTime={setTime(new Date(), 23, 59)} // 23:59 is effectively 11:59 PM
                    timeCaption="Time"
                    dateFormat="hh:mm aa"
                    onFocus={(e:any) => e.target.blur()}
                    inputmode='none'
                  />
                ) : props.rangePicker ? (
                  <DatePicker
                    className={`date-field ${style.datePicker}`}
                    placeholderText={props.placeholder}
                    ref={datepickerRef}
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    isClearable={false}
                    onChange={(e: any) => {
                      // console.log(e);
                      onChange(e);
                      setDateRange(e);
                      props.onChange && props.onChange(e);
                    }}
                    onFocus={(e:any) => e.target.blur()}
                    inputmode='none'
                  />
                ) : (
                  <DatePicker
                    selected={value}
                    className={`date-field ${style.datePicker}`}
                    placeholderText={props.placeholder}
                    ref={datepickerRef}
                    minDate={moment().toDate()}
                    onChange={(e: any) => {
                      onChange(e);
                      props.onChange && props.onChange(e);
                    }}
                    onFocus={(e:any) => e.target.blur()}
                    inputmode='none'
                  />
                )}

                <span
                  className={style.dateIcon}
                  onClick={() => handleClickDatepickerIcon()}
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
