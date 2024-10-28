"use client";

import React, { Fragment } from "react";
import style from "../index.module.scss";
import SvgComp from "../../SvgComp";
import { useForm } from "react-hook-form";

// hook form

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "../../Form/FormGroup";
import Link from "next/link";
import { useCreateAccountMutation } from "@/redux/reducers/UserSlice/UserApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SpinLoader from "../../Loader/SpinLoader";
import logoIcon from "../../../../public/assets/svg/dashboard/logo.svg";

const init = {
  email: "",
  password: "",
  country: "",
  fullName: "",
  phoneNumber: "",
};

const Signup = () => {
  const [create, { data, isLoading }] = useCreateAccountMutation();
  const router = useRouter();

  const schema = yup.object({
    email: yup
      .string()
      .email("Not a valid email address")
      .required("This field is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    country: yup.string().required("This field is required"),
    fullName: yup.string().required("This field is required"),
    phoneNumber: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        {
          message: "Please enter a valid phone number",
          excludeEmptyString: true,
        }
      )
      .required("Phone number is required")
      .min(9, "Minimum 9 digits")
      .max(15, "Maximum 15 digits")
      .typeError("Phone number is required"),
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
    {
      type: "input",
      name: "fullName",
      placeholder: "Enter your Name",
      inputtype: "text",
      label: true,
      dashboardCustom: "dashboardInputs",
      width: "fullWidth",
      inputLabel: "Full Name",
    },
    {
      type: "input",
      name: "country",
      placeholder: "Enter Country",
      inputtype: "text",
      label: true,
      dashboardCustom: "dashboardInputs",
      width: "fullWidth",
      inputLabel: "country",
    },
    {
      type: "tel",
      name: "phoneNumber",
      width: "fullWidth",
      label: true,
      inputLabel: "Contact Number",
    },
    {
      type: "input",
      name: "password",
      placeholder: "Enter Your Password",
      inputtype: "password",
      label: true,
      dashboardCustom: "dashboardInputs",
      width: "fullWidth",
      inputLabel: "Create Password",
    },
  ];

  const onSubmit = async (resp: any) => {
    resp.username = resp.fullName;

    try {
      const response = await create(resp).unwrap();
      if (typeof window !== "undefined") {
        localStorage?.setItem("user", JSON.stringify(response?.user));
        sessionStorage?.setItem("emailforResetPassword", response?.user?.email);
      }

      // const sessionResponse = await signIn("signup", {
      //   email: resp.email,
      //   password: resp.password,
      //   country: resp.country,
      //   phoneNumber: resp.phoneNumber,
      //   fullName: resp.fullname,
      //   redirect: false,
      // });
      toast.success(response?.message);
      router.push("/otp?resetPassword=true");
    } catch (error: any) {
      // toast.error(error.message); // Handle signup error
      toast.error(error?.data?.error?.message || "Something went wrong!");
    }

    // await create(resp)
    //   .unwrap()
    //   .then((res: any) => {
    //     toast.success(res.message);
    //     router.push("/otp");
    //     // redirect("/sign-in");

    //     const sessionResponse = await signIn("credentials", {
    //       email: data?.email,
    //       password: data?.password,
    //       redirect: false,
    //     });
    //   })
    //   .catch((err: any) => toast.error(err.message));
    // console.log(resp, "res");
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
              <Link className={style.logo} href="/">
                <SvgComp src={logoIcon} />
              </Link>
              <h2 className={style.title}>
                Create your own experience at Reef Mall
              </h2>
            </div>
            <p className={style.copyright}>Copyright © 2024 Reef Mall. All Rights Reserved.</p>
          </div>
        </div>
        <div className="col_12 col_xl_6 col_lg_12 col_md_12">
          <div
            className={`${style.rightContainer} ${style.signupRight} sign-up-form`}
          >
            <div className={style.titleWrapper}>
              <h2 className={style.title}>Create an account</h2>
              <p className={style.subTitle}>
                {"Let’s get started by creating an account"}
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
                <button
                  disabled={isLoading}
                  type="submit"
                  className={style.gradientButton}
                >
                  <span className={style.btn}>
                    {isLoading ? <SpinLoader size="small" /> : "Sign Up"}
                  </span>
                </button>
              </div>
              <div
                className={`${style.signupWrapper} col_12 ${style.signupWrapperMobile}`}
              >
                <p className={style.accountText}>Already have an account? </p>
                <Link className={style.accountLink} href={"/sign-in"}>
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
