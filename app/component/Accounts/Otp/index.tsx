"use client";

import React, { useEffect, useState } from "react";
import style from "../index.module.scss";
import SvgComp from "../../SvgComp";
import OtpInput from "react-otp-input";
import Link from "next/link";
import logoIcon from "../../../../public/assets/svg/dashboard/logo.svg";
import leftIcon from "../../../../public/assets/svg/arrow-left.svg";
import checkIcon from "../../../../public/assets/svg/dashboard/check-otp.svg";

import {
  useForgotPasswordMutation,
  useOtpVerificationMutation,
  useResetOtpVerifyMutation,
} from "@/redux/reducers/UserSlice/UserApiSlice";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
// import { redirect } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const Otp = () => {
  const [otp, setOtp] = useState("");
  console.log("🚀 ~ Otp ~ otp:", otp);
  const [verify, { data, isLoading }] = useOtpVerificationMutation();
  const [active, setActive] = useState(false);
  const [reset] = useResetOtpVerifyMutation();
  const { data: session, update } = useSession();
  const router = useRouter();
  const [mutate, { isLoading: resetpass }] = useForgotPasswordMutation();
  const [loading, setLoading] = useState(false);

  const searchParam = useSearchParams();
  const isResetPassword = searchParam.get("isReset");
  console.log("🚀 ~ Otp ~ isResetPassword:", isResetPassword);

  let userEmail: any =
    typeof window !== "undefined" ? localStorage?.getItem("user") : "";
  userEmail = userEmail ? JSON.parse(userEmail) : null;

  let resetuserEmail: any =
    typeof window !== "undefined"
      ? sessionStorage?.getItem("emailforResetPassword")
      : "";
  resetuserEmail = resetuserEmail ? resetuserEmail : null;
  console.log("🚀 ~ Otp ~ resetuserEmail:", resetuserEmail);

  useEffect(() => {
    const verifyOtp = async () => {
      if (otp.length === 4) {
        console.log("🚀 ~ verifyOtp ~ otp:", otp);
        if (Boolean(isResetPassword)) {
          try {
            const payload = {
              otp,
              email: resetuserEmail,
            };
            setActive(true);
            const apires = await reset(payload).unwrap();
            toast.success("OTP verified successfully");
            router.push(`/reset-password?code=${apires?.code}`);
          } catch (error) {
            console.error("Error:", error);
            setActive(false);
            toast.error("Failed to verify OTP");
          }
        } else {
          try {
            // Perform OTP verification
            const sessionResponse = await signIn("otp-verify", {
              email: userEmail?.email, // Provide the user's email
              otp: otp,
              redirect: false,
            });
            console.log(sessionResponse, "sessionResponse");
            if (sessionResponse?.status === 401) {
              setActive(false);
              toast.error("OTP is Invalid or Expired!");
            } else if (sessionResponse) {
              setActive(true);
              toast.success("OTP verified successfully");

              if (typeof window !== "undefined") {
                localStorage?.removeItem("user");
              }
              router.push("/user-profile");
            }
          } catch (error) {
            setActive(false);
            console.error("Error:", error);
            toast.error("Failed to verify OTP");
          }
        }
      }
    };

    verifyOtp();
  }, [otp]);

  const resendcode = async (e: any) => {
    // e.preventDefault();
    console.log(resetuserEmail, "resetuserEmail resend code");
    setOtp("");

    try {
      setLoading(true);
      const result = await mutate({ email: resetuserEmail }).unwrap();
      toast.success(result?.message || "Check your email to proceed !");
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
              {/* <h2 className={style.title}>Password Reset</h2> */}
              <h2 className={style.title}>
                {isResetPassword ? "Password Reset" : "Enter OTP"}
              </h2>
              <p className={style.subTitle}>
                Please enter the code sent to your email
              </p>
            </div>
            <div className={style.otpWrapper}>
              <div className={style.otpContainer}>
                {/* ${active ? style.active : style.inactive } */}
                <OtpInput
                  inputStyle={`${style.optInput}`}
                  value={otp}
                  onChange={setOtp}
                  inputType="number"
                  numInputs={4}
                  renderInput={(props) => <div className={`${props.value ? style.activeOtpInput : ""}`}><input {...props} /></div>}
                />
                {/* {active ? <SvgComp src={checkIcon} /> : ""} */}
              </div>
              <div className={`${style.signupWrapper} `}>
                <p className={style.accountText}>{"Didn't get the code? "}</p>
                {/* <span
                  className={style.accountLink}
                  // href={"#"}
                  onClick={resendcode}
                  style={{ pointerEvents: setLoading ? "none" : "" }}
                >
                  Send again
                </span> */}

                <span
                  className={style.accountLink}
                  // {/* href={"#"} */}
                  onClick={resendcode}
                  style={{ pointerEvents: loading ? "none" : "auto" }}
                >
                  Send again
                </span>
              </div>
              <Link className={style.accountLinkForgot} href={"/sign-in"}>
                <SvgComp src={leftIcon} />
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Otp;
