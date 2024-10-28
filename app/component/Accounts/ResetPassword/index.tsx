"use client";

import React, { Fragment } from "react";
import style from "../index.module.scss";
import SvgComp from "../../SvgComp";
import { useForm } from "react-hook-form";
import { redirect, useSearchParams } from "next/navigation";
// hook form

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "../../Form/FormGroup";
import Link from "next/link";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/redux/reducers/UserSlice/UserApiSlice";
import { useRouter } from "next/navigation";
import leftIcon from "../../../../public/assets/svg/arrow-left.svg";
import Image from "next/image";
import SpinLoader from "../../Loader/SpinLoader";
import logoIcon from "../../../../public/assets/svg/dashboard/logo.svg";

const init = {
  newpassword: "",
  confirmpassword: "",
};

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
  const schema = yup.object({
    newpassword: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmpassword: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
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
      name: "newpassword",
      placeholder: "Enter Your Password",
      inputtype: "password",
      label: true,
      dashboardCustom: "dashboardInputs",
      width: "fullWidth",
      inputLabel: "Enter Your New Password",
    },
    {
      type: "input",
      name: "confirmpassword",
      placeholder: "Enter Your Password",
      inputtype: "password",
      label: true,
      dashboardCustom: "dashboardInputs",
      width: "fullWidth",
      inputLabel: "Confirm Password",
    },
  ];

  let resetuserEmail: any =
    typeof window !== "undefined"
      ? sessionStorage?.getItem("emailforResetPassword")
      : "";
  resetuserEmail = resetuserEmail ? resetuserEmail : null;

  const onSubmit = async (data: any) => {
    try {
      let payload = {
        email: resetuserEmail,
        code: code,
        password: data?.newpassword,
        confirmPassword: data?.confirmpassword,
      };
      const response = await resetPassword(payload).unwrap();
      router.replace("/sign-in");
      // toast.success("Success!");
      toast.success(
        "Your password has been reset. You can now log in with your new password."
      );
      if (typeof window !== "undefined") {
        sessionStorage?.removeItem("emailforResetPassword");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (!code) {
    redirect("/forgot-password");
  }

  return (
    <section className={style.signIn}>
      <div className="custom-row">
        {/* <div className="col_12 col_xl_6 col_lg_6 col_md_6">
          <div className={style.leftContainer}>
            <div className={style.titleWrapper}>
              <SvgComp src={logoIcon} />
              <h2 className={style.title}>
                Create your own experience at Reef Mall 
              </h2>
            </div>
            <p className={style.copyright}>
              Copyright © 2024 Reef Mall. All Rights Reserved.
            </p>
          </div>
        </div> */}
        <div className="col_12 col_xl_6 col_lg_12 col_md_12">
          <div className={style.leftContainer}>
            <div className={style.leftPattern}>
              <Image
                alt=""
                height={980}
                width={92}
                src={"/assets/images/pattern/pattern-image.png"}
              />
            </div>
            <div className={style.rightPattern}>
              <Image
                alt=""
                height={980}
                width={92}
                src={"/assets/images/pattern/pattern-image.png"}
              />
            </div>
            <div className={style.titleWrapper}>
              <Link className={style.logo} href="/">
                <SvgComp src={logoIcon} />
              </Link>
              <h2 className={style.title}>
                Create your own experience at Reef Mall
              </h2>
            </div>
            <p className={style.copyright}>
              Copyright © 2024 Reef Mall. ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
        <div className="col_12 col_xl_6 col_lg_12 col_md_12">
          <div className={style.rightContainer}>
            <div className={style.titleWrapper}>
              <h2 className={style.title}>Reset Password</h2>
              <p className={style.subTitle}>Please enter your new password</p>
            </div>
            <form
              className={style.formWrapper}
              onSubmit={handleSubmit(onSubmit)}
            >
              {fields.map((item: any, i: number) => (
                <Fragment key={i}>
                  <FormGroup control={control} errors={errors} item={item} />
                </Fragment>
              ))}
              <div className={`${style.buttonContainer} col_12`}>
                <button
                  disabled={isLoading}
                  type="submit"
                  className={style.gradientButton}
                >
                  <span className={style.btn}>
                    {isLoading ? <SpinLoader size="small" /> : "Reset Password"}
                  </span>
                </button>
              </div>
              <div className={`${style.signupWrapper} col_12`}>
                <Link className={style.accountLinkForgot} href={"/sign-in"}>
                  <SvgComp src={leftIcon} />
                  Back to sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
