/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { Fragment, useState } from "react";
import style from "../index.module.scss";
import SvgComp from "../../SvgComp";
import { useForm } from "react-hook-form";

// hook form

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "../../Form/FormGroup";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "@/redux/reducers/UserSlice/UserApiSlice";
import { useRouter } from "next/navigation";
import SpinLoader from "../../Loader/SpinLoader";
import logoIcon from "../../../../public/assets/svg/dashboard/logo.svg";
import leftIcon from "../../../../public/assets/svg/arrow-left.svg";
import Image from "next/image";

const init = {
  email: "",
};

const ForgotPassword = () => {
  const [mutate, { isLoading }] = useForgotPasswordMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const schema = yup.object({
    email: yup
      .string()
      .email("Not a Valid email")
      .required("This Field is required"),
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
      name: "email",
      placeholder: "Enter your Email",
      inputtype: "email",
      label: true,
      dashboardCustom: "dashboardInputs",
      width: "fullWidth",
      inputLabel: "Email",
    },
  ];

  //   const onSubmit = async (data: any) => {
  //     try {
  //       const result = await forgotPassword(data)
  //         .unwrap()
  //         .then((res: any) => {
  //           if (typeof window !== "undefined") {
  //             sessionStorage?.setItem("emailforResetPassword", data?.email);
  //           }
  //           redirect("/app?resetpassword=true");
  //           toast.success("Check you email to proceed !");
  //         })
  //         .catch((err: any) => {
  //           toast.error(err?.error?.message);
  //         });
  //     } catch (error) {
  //       toast.error("Something went wrong !");
  //     }
  //   };
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const result = await mutate(data).unwrap();
      if (typeof window !== "undefined") {
        sessionStorage?.setItem("emailforResetPassword", data?.email);
      }
      router.push("/otp?isReset=true");
      toast.success("Check your email to proceed !");
    } catch (err: any) {
      console.log(err, "test errror");
      toast.error(err?.data?.error?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

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
              {/* TODO: change logo */}
              <Link className={style.logo} href="/">
                <SvgComp src={logoIcon} />
              </Link>
              <h2 className={style.title}>
                Create your own experience at Reef Mall
              </h2>
            </div>
            <p className={style.copyright}>
              Copyright © 2024 Reef Mall. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="col_12 col_xl_6 col_lg_12 col_md_12">
          <div className={`${style.rightContainer} auth-form-custom`}>
            <div className={style.titleWrapper}>
              <h2 className={style.title}>Forgot Password</h2>
              <p className={style.subTitle}>
                No worries we'll send you reset instructions
              </p>
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
                {loading ? (
                  <button className={style.gradientButton} disabled={loading}>
                    <span className={style.btn}>
                      <SpinLoader size="small" />
                    </span>
                  </button>
                ) : (
                  <button type="submit" className={style.gradientButton}>
                    <span className={style.btn}>{"Continue"}</span>
                  </button>
                )}
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

export default ForgotPassword;
