"use client";

import React, { Fragment } from "react";
import style from "./index.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EmailRegex, PhoneRegex } from "@/app/utilities/utility";
import { useForm } from "react-hook-form";
import AnchorButton from "../AnchorButton";
import FormGroup from "../FormGroup";
import SpinLoader from "../../Loader/SpinLoader";
import SvgComp from "../SvgComp";
import Image from "next/image";

const init = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  // date: "",
  // time: "",
  notes: "",
};

type reserveFormProps = {
  color?: any;
  title?: string
  onSubmit?: any
  loading?: any
  sendText?: string
  dataSend?: boolean
};

const ReserveForm = ({ color, title, onSubmit, loading, dataSend, sendText }: reserveFormProps) => {
  const schema = yup.object({
    name: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Not a valid email address")
      .matches(EmailRegex, "Not a valid email address")
      .required("This field is required"),
    phone: yup
      .string()
      .matches(PhoneRegex, {
        message: "Please enter a valid phone number and add + before number",
        excludeEmptyString: true,
      })
      .required("Phone number is required")
      .min(9, "Minimum 9 digits")
      .max(15, "Maximum 15 digits")
      .typeError("Phone number is required"),
    notes: yup.string().required("This field is required"),
  });

  const validateSchema: any = schema;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateSchema), defaultValues: init });

  const fields = [
    {
      type: "input",
      name: "name",
      placeholder: "Enter your First Name *",
      inputtype: "text",
      label: true,
      inputLabel: "First Name",
      exclass: "",
    },
    {
      type: "input",
      name: "lastname",
      placeholder: "Enter your Last Name *",
      inputtype: "text",
      label: true,
      inputLabel: "Last Name",
      exclass: "",
    },
    {
      type: "input",
      name: "email",
      placeholder: "Enter your Email *",
      inputtype: "email",
      label: true,
      inputLabel: "Email",
      exclass: "",
    },
    {
      type: "input",
      name: "phone",
      placeholder: "Enter your Phone Number *",
      inputtype: "text",
      label: true,
      inputLabel: "Phone",
      exclass: "",
    },
    // {
    //   type: "date",
    //   name: "date",
    //   placeholder: "MM/DD/YYYY",
    //   inputtype: "date",
    //   label: true,
    //   inputLabel: "Date",
    //   exclass: "",
    // },
    // {
    //   type: "date",
    //   name: "time",
    //   placeholder: "HH:MM AM",
    //   inputtype: "date",
    //   label: true,
    //   time: true,
    //   inputLabel: "Time",
    //   exclass: "",
    // },
    {
      type: "textarea",
      name: "notes",
      placeholder: "Enter your Notes",
      rows: 4,
      col: 10,
      exclass: "helpformHeight",
      label: true,
      customClass: "fullwidth",
      inputLabel: "Notes",
    },
  ];


  return (
    <div
      className={`${style.reserveFormWrapper}  ${style[color]} ${color === "purple" ? "reserve-form-purple" : "reserve-form-custom"
        }`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.headingWrapper}>
          <h3 className={style.title}>{title ? title : "Reserve Your Table Today"}</h3>
        </div>
        <div className="form-custom">
          {fields.map((item: any, i: number) => (
            <Fragment key={i}>
              <FormGroup control={control} errors={errors} item={item} />
            </Fragment>
          ))}
        </div>
        <div className={style.buttonWrapper}>
          <AnchorButton
            isDisabled={loading ? true : false}
            title={loading ? <div className={style.spinWrapper}><SpinLoader color={"purple"} size={"small"} /></div> : "Apply Now"}
            type="button"
            buttonType="submit"
            color="white"
          />
        </div>
        {dataSend &&
          <div className={style.thanksWrapper}>
            <Image alt="success" height={20} width={20} src="/assets/svg/thank.svg" />
            <p className={style.titleSuccess}>{sendText}</p>
          </div>}
      </form>
    </div>
  );
};

export default ReserveForm;
