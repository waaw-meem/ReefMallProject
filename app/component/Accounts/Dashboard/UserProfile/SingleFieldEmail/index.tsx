"use client";
import React, { useEffect } from "react";
import style from "./index.module.scss";
import { useForm } from "react-hook-form";
import InputField from "@/app/component/Form/FormElement/InputField";

const SingleFieldEmail = (props: any) => {
  const { init } = props;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (init) {
      setValue("email", init.email);
    }
  }, [init, setValue]);

  const onSubmit = (val: any) => {
    let data = {};
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`form-group ${style.inputFormWrapper}`}>
        <label className={style.label}>Email</label>
        <div className={`${style.input}  ${style.emailField}`}>
          <InputField
            name={"email"}
            control={control}
            placeholder={"Enter Email"}
            type={"text"}
            class={`${style.input}`}
            req={true}
            readOnly={true}
          />
        </div>
      </div>
    </form>
  );
};

export default SingleFieldEmail;
