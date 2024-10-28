"use client";
import React, { useEffect, useState } from "react";
import style from "../SingleFieldEmail/index.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "@/app/component/Form/FormElement/InputField";
import { useChangePasswordMutation } from "@/redux/reducers/UserSlice/UserApiSlice";
import { toast } from "react-toastify";
import SpinLoader from "@/app/component/Loader/SpinLoader";

const initval = {
  oldpassword: "",
  password: "",
  confirm: "",
};

const SingleFieldPassword = (props: any) => {
  const [formData, setFormData] = useState(initval);
  const [edit, setEdit] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [passwordAsteric, setPasswordAsteric] = useState(false);
  const schema = yup.object({
    oldpassword: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match")
      .required("This field is required"),
  });
  const validateSchema: any = schema;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: formData,
  });

  const onSubmit = async (data: any) => {
    try {
      let payload = {
        currentPassword: data?.oldpassword,
        password: data?.password,
        passwordConfirmation: data?.confirm,
      };

      const response = await changePassword(payload).unwrap();

      toast.success("Your password has been updated successfully");
      reset();
      setEdit(false);
      setFormData(initval);
    } catch (error: any) {
      // console.log(error);
      toast.error(error?.data?.error?.message || "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${style.phoneAndPasswordField}`}
    >
      <div className={`form-group form-group-passwrod ${style.inputFormWrapper}`}>
        <label className={style.label}>
          {edit ? "Current password" : "Password"}
        </label>
        <div className={`${style.input} ${edit ? style.editinput : ""}`}>
          <InputField
            name={"oldpassword"}
            control={control}
            placeholder={
              edit ? "Enter Your current password" : "****************"
            }
            type={"password"}
            class={style.input}
            req={true}
            readOnly={!edit}
          />
          {errors["oldpassword"] && (
            <span className="error">{errors["oldpassword"]?.message}</span>
          )}
        </div>

        <button
          type={"button"}
          onClick={() => setEdit(true)}
          className={`${style.button} ${edit ? style.visible : ""}`}
        >
          Change Password
        </button>
      </div>
      {edit && (
        <>
          <div className={`form-group form-group-passwrod ${style.inputFormWrapper}`}>
            <label className={style.label}>New Password</label>
            <div className={`${style.input} ${edit ? style.editinput : ""}`}>
              <InputField
                name={"password"}
                control={control}
                placeholder={"Enter Your new password"}
                type={"password"}
                class={style.input}
                req={true}
                readOnly={!edit}
              />
              {errors["password"] && (
                <span className="error">{errors["password"]?.message}</span>
              )}
            </div>
          </div>
          <div className={`form-group form-group-passwrod ${style.inputFormWrapper}`}>
            <label className={style.label}>Confirm Password</label>
            <div className={`${style.input} ${edit ? style.editinput : ""}`}>
              <InputField
                name={"confirm"}
                control={control}
                placeholder={"Re-enter new password"}
                type={"password"}
                class={style.input}
                req={true}
                readOnly={!edit}
              />
              {errors["confirm"] && (
                <span className="error">{errors["confirm"]?.message}</span>
              )}
            </div>
            {!isLoading ? (
              <button
                type={"submit"}
                className={`${style.button} ${!edit ? style.visible : ""}`}
              >
                Update Password
              </button>
            ) : (
              <button
                disabled
                className={`${style.button} ${!edit ? style.visible : ""}`}
              >
                <SpinLoader size={"small"} />
              </button>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default SingleFieldPassword;
