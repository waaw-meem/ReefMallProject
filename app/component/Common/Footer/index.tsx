"use client"

import React, { useEffect, useState } from 'react'
import style from "./index.module.scss"
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputField from '../../Form/FormElement/InputField';
import { toast, ToastContainer } from "react-toastify";
import SpinLoader from '../../Loader/SpinLoader'
import "react-toastify/dist/ReactToastify.css";
import { EmailRegex } from '@/app/utilities/utility'


type footerProps = {
  data: any
  data2: any
  followText: string
  copyRightText: string
  subscribeText: string
  data3: any
  logo: string
}


const init = {
  email: "",
};

const Footer = ({ copyRightText, data, data2, followText, subscribeText, data3, logo }: footerProps) => {
  const [loading, setLoading] = useState(false);
  const [resError, setResError] = useState(false);
  const [dataSends, setDataSends] = useState(false);
  const [sending, setSending] = useState("");



  const schema = yup.object({
    email: yup
      .string()
      .email("Not a valid email address")
      .matches(EmailRegex, "Not a valid email address")
      .required("This field is required"),
  });

  const validateSchema: any = schema;


  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateSchema), defaultValues: { email: "" } });


  useEffect(() => {
    const newsletterData = async () => {


    }
    newsletterData()

  }, [])


  const onSubmit = async (val: any) => {
    // const data = newsletter.find((item: any) => item?.attributes?.includes(val))

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/newsletter-subscriptions`,
        {
          cache: "no-store",
        }
      );
      const data1 = await res.json();
      const newsletters = data1?.data.some((item: any) => item?.attributes?.email == val?.email);
      if (newsletters) {
        // toast.error("Already Subscribed!");
        setDataSends(true);
        setTimeout(() => {
          setDataSends(false);
        }, 3000);
        setSending("Already subscribed!")
      } else {
        setLoading(true)
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/newsletter-subscriptions`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  email: val.email,
                },
              }),
            }
          );

          if (!res.ok) {
            setResError(true);
            setTimeout(() => {
              setResError(false);
            }, 3000);
          } else {
            setDataSends(true);
            setLoading(false);
            setSending("You are now subscribed!")
            setTimeout(() => {
              setDataSends(false);
            }, 3000);
            reset();
          }
        } catch (error) {
          if (error) {
            setDataSends(true);
            setTimeout(() => {
              setDataSends(false);
            }, 3000);
            setSending("Something Went Wrong!");
          }
        }
      }

    } catch (error) {
      throw new Error("Failed to fetch data");
    }


  };
  return (
    <footer className={`footer ${style.footer}`}>
      <div className="container">
        <div className="custom-row">
          <div className="col_12 col_xl_6 order-1">
            <div className={style.styleLinkWrapper}>
              <div className="custom-row">
                {data3?.map((item: any, index: number) => {
                  return (
                    <div className="col_6 col_xl_4 col_md_4" key={index}>
                      <div key={index} className={style.contentLinkWrapper}>
                        <h6 className={`h6 fw-500 ${style.heading}`}>{item?.title}</h6>
                        <ul>
                          {item?.menu?.map((menu: any, index: number) => {
                            return (
                              <li className={style.linkItem} key={index}>
                                {menu?.ctaLink &&
                                  <Link
                                    target={menu?.ctaTarget}
                                    className='w-uline'
                                    href={`/${menu?.ctaLink}`}>
                                    {menu?.title}
                                  </Link>}
                                {!menu?.ctaLink && <p>{menu?.title}</p>}
                              </li>
                            )
                          })
                          }
                        </ul>

                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="col_12 col_xl_offset_1 col_xl_5 order-2">
            <div className={style.newsletterWrapper}>
              <h3 className={`h3 fw-500 ${style.title}`}>{subscribeText}</h3>
              <div className={style.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputField
                    name={"email"}
                    control={control}
                    placeholder={"Enter Your Email..."}
                    type={"text"}
                    class={`${style.newsletter_input} ${style.input}`}
                    req={true}
                    readOnly={false}
                  />
                  {/* <input type="email" placeholder="Enter Your Email..." /> */}
                  <button
                    type="submit"
                    disabled={loading ? true : false}
                    className={`${style.submitButton}`}>
                    {loading ?
                      <SpinLoader color={"purple"} size={"small"} /> :
                      <Image src={'/assets/svg/right-arrow.svg'} alt='right-icon' width={18} height={18} />
                    }
                  </button>
                  {errors["email"] && (
                    <span className={style.error}>{errors["email"]?.message}</span>
                  )}
                  {dataSends &&
                    <div className={style.successWrapper}>
                      <span>{sending}</span>
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
          <div className="col_12 col_xl_offset_7 col_xl_5 order-3">
            <div className={style.socialWrapper}>
              <h6 className={`h6 fw-500 ${style.heading}`}>
                {followText}
              </h6>
              <ul>
                {data?.map((item: any, index: number) => {
                  return (
                    <li key={index}>
                      <Link href={`${item.ctaLink}`} target='_blank'>
                        <Image src={item.img?.data?.attributes?.url} alt={item?.title ? item?.title : "icon"} height={16} width={20} />
                      </Link>
                    </li>
                  )
                })
                }
              </ul>
            </div>
          </div>
          <div className="col_12 col_xl_5 order-4">
            <div className={`${style.bottomFooter}`}>
              <div className={`${style.logoWrapper}`}>
                <Link href={"/"}>
                  <Image src={logo} alt='logo' width={265} height={136} />
                </Link>
              </div>
            </div>
          </div>
          <div className="col_12 col_xl_7 order-5">
            <div className={`${style.copywriteWrapper}`}>
              <p>{copyRightText}</p>
              <ul>
                {data2?.map((item: any, index: number) =>
                  <li key={index}>
                    <Link
                      target={item?.ctaTarget}
                      className='w-uline'
                      href={`/${item?.ctaLink}`}>
                      {item?.title}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

      </div>
      <Image className={style.bgVector} src={"/assets/svg/bottom-flower.svg"} alt='flower-vector' width={590} height={662} />

    </footer>
  )
}

export default Footer