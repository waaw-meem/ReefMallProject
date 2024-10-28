"use client";

import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import style from "../index.module.scss";
import SvgComp from "../../SvgComp";
import { useForm } from "react-hook-form";

// hook form

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "../../Form/FormGroup";
import Link from "next/link";
import { signIn } from "next-auth/react";
import SpinLoader from "../../Loader/SpinLoader";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import logoIcon from "../../../../public/assets/svg/dashboard/logo.svg";

import { useLogInMutation } from "@/redux/reducers/UserSlice/UserApiSlice";
import Image from "next/image";
import AnchorButton from "../../Common/AnchorButton";

const init = {
  email: "",
  password: "",
  keepLoggedIn: false,
};

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [mutate] = useLogInMutation();
  const schema = yup.object({
    email: yup
      .string()
      .email("Not a Valid email")
      .required("This Field is required"),
    password: yup
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
      name: "email",
      placeholder: "Enter your Email",
      inputtype: "email",
      label: true,
      dashboardCustom: "dashboardInputs",
      inputLabel: "Email",
      width: "fullWidth",
    },
    {
      type: "input",
      name: "password",
      placeholder: "✱✱✱✱✱✱✱✱✱",
      inputtype: "password",
      inputLabel: "Password",
      label: true,
      dashboardCustom: "dashboardInputs",
      width: "fullWidth",
    },
    {
      type: "checkbox",
      name: "logged in",
      bold: true,
      forget: true,
      icon: true,
      width: "fullWidth",
      exclass: "loggedIn",
      options: [
        {
          id: "1",
          name: "Keep me logged in",
        },
      ],
    },
  ];

  // const onSubmit = async (data: any) => {
  //   const apiResponse = await mutate(data);
  //   // console.log(apiResponse);
  //   // console.log(apiResponse?.data?.user?.type == "vendor");
  //   if (apiResponse?.data?.user?.type == "vendor") {
  //     if (typeof window !== "undefined") {
  //       localStorage?.setItem("user", JSON.stringify(apiResponse?.data?.user));
  //     }
  //     router.push("/otp");
  //   } else {
  //     try {
  //       setLoading(true);
  //       const sessionResponse = await signIn("credentials", {
  //         email: data?.email,
  //         password: data?.password,
  //         redirect: false,
  //       });
  //       console.log(sessionResponse, session, "sessionResponse");
  //       if (sessionResponse?.status === 200) {
  //         setLoading(false);
  //         router.replace("/user-profile");
  //         return;
  //       }
  //       setLoading(false);
  //       toast.error("Invalid credentials");
  //       return;
  //     } catch (error) {
  //       setLoading(false);
  //       console.error("Error", error);
  //     }
  //   }
  //   // try {
  //   //   setLoading(true);
  //   //   const sessionResponse = await signIn("credentials", {
  //   //     email: data?.email,
  //   //     password: data?.password,
  //   //     redirect: false,
  //   //   });
  //   //   console.log(sessionResponse, session, "sessionResponse");
  //   //   if (sessionResponse?.status === 200) {
  //   //     setLoading(false);

  //   //     router.replace("/user-profile");
  //   //     return;
  //   //   }

  //   //   setLoading(false);
  //   //   toast.error("Invalid credentials");
  //   //   return;
  //   // } catch (error) {
  //   //   setLoading(false);
  //   //   console.error("Error", error);
  //   // }
  // };
  // console.log(session, "sessionResponse");

  // const onSubmit = async (data: any) => {
  //   try {
  //     setLoading(true);
  //     const apiResponse = await mutate(data);
  //     console.log(
  //       "🚀 ~ onSubmit ~ apiResponse:",
  //       apiResponse?.data?.user?.type
  //     );

  //     if (
  //       apiResponse?.data?.user?.type === "vendor"
  //       ||
  //       apiResponse?.data?.user?.type === "customer"
  //       &&
  //       !apiResponse?.data?.user?.confirmed
  //     ) {
  //       localStorage?.setItem("user", JSON.stringify(apiResponse?.data?.user));
  //       // router.push("/otp");
  //     } else {
  //       const sessionResponse = await signIn("credentials", {
  //         email: data?.email,
  //         password: data?.password,
  //         redirect: false,
  //       });

  //       if (sessionResponse?.status === 200) {
  //         setLoading(false);
  //         router.replace("/user-profile");
  //       } else {
  //         setLoading(false);
  //         toast.error("Invalid credentials");
  //       }
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Error", error);
  //   }
  // };
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const apiResponse = await mutate(data);
      if (apiResponse.error) {
        throw new Error("Login failed");
      }

      if (
        apiResponse?.data?.user?.type === "vendor" ||
        (apiResponse?.data?.user?.type === "customer" &&
          !apiResponse?.data?.user?.confirmed)
      ) {
        localStorage?.setItem("user", JSON.stringify(apiResponse?.data?.user));
        if (typeof window !== "undefined") {
          sessionStorage?.setItem("emailforResetPassword", data?.email);
        }
        router.push("/otp?resetPassword=true");
        return;
      }
      // else
      if (apiResponse?.data?.user?.blocked == true) {
        setLoading(false);
        toast.error("Your account has been blocked!");
        return;
      }
      // else {
      const sessionResponse = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      });

      if (sessionResponse?.status === 200) {
        setLoading(false);
        router.replace("/user-profile");
      } else if (sessionResponse?.error === "Your account has been blocked!") {
        setLoading(false);
        toast.error("Your account has been blocked!");
      } else {
        setLoading(false);
        toast.error("Invalid credentials");
      }
      // }
    } catch (error) {
      setLoading(false);
      console.error("Error", error);
    }
  };

  return (
    <section className={style.signIn}>
      <div className="custom-row">
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
          <div className={style.rightContainer}>
            <div className={style.titleWrapper}>
              <h2 className={style.title}>Welcome</h2>
              <p className={style.subTitle}>
                Please enter your details to proceed
              </p>
            </div>
            <form
              className={`${style.formWrapper} form-wrapper-auth`}
              onSubmit={handleSubmit(onSubmit)}
            >
              {fields.map((item: any, i: number) => (
                <Fragment key={i}>
                  <FormGroup control={control} errors={errors} item={item} />
                </Fragment>
              ))}
              <div className={`${style.buttonContainer} col_12`}>
                <button
                  type="submit"
                  disabled={loading}
                  className={style.gradientButton}
                >
                  <span className={style.btn}>
                    {!loading ? "Sign In" : <SpinLoader size="small" />}
                  </span>
                </button>
              </div>
              <div className={`${style.signupWrapper} col_12`}>
                <p className={style.accountText}>Don’t have an account? </p>
                <Link className={style.accountLink} href={"/sign-up"}>
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
