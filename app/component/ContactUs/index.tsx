"use client";

import Image from "next/image";
import Heading from "../Common/Heading";
import style from "./index.module.scss"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EmailRegex, PhoneRegex } from "../../utilities/utility";
import { Fragment, useState } from "react";
// import FormGroup from "../Common/FormGroup";
import AnchorButton from "../Common/AnchorButton";
import Link from "next/link";
import FormGroup from "../Form/FormGroup";
import SpinLoader from "../Loader/SpinLoader";
import { toast, ToastContainer } from "react-toastify";
import SvgComp from "../SvgComp";
// import "react-toastify/dist/ReactToastify.css";



const init = {
    name: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
};

type contactUsProps = {
    title?: string,
    subtitle?: string,
    desc: string,
    img?: string,
    locationTitle?: string,
    locationArray?: any,
    emailTitle?: string,
    data?: any,
    phoneTitle?: string,
    data2?: any,
    smTitle?: string,
    values?: any,
    formTitle: any
    formSubtitle: any
    formDesc: string
    locationIcon: string
    emailIcon: string
    phoneIcon: string
    shareIcon: string
}

const ContactUsComp = ({
    title,
    subtitle,
    img,
    locationTitle,
    locationArray,
    desc,
    emailTitle, data, phoneTitle, data2, smTitle, values, formTitle, formSubtitle, formDesc, emailIcon, locationIcon, phoneIcon, shareIcon }: contactUsProps) => {

    const [loading, setLoading] = useState(false);
    const [dataSends, setDataSends] = useState(false);
    const [sending, setSending] = useState("");

    const schema = yup
        .object({
            name: yup.string().required("This field is required"),
            phone: yup
                .string()
                .max(14)
                .matches(PhoneRegex, {
                    message: "Please enter a valid phone number and add + before number",
                    excludeEmptyString: true,
                })
                .required("Phone number is required")
                .min(9, "Minimum 9 digits")
                .max(15, "Maximum 15 digits")
                .typeError("Phone number is required"),
            email: yup
                .string()
                .email("Not a valid email address")
                .matches(EmailRegex, "Not a valid email address")
                .required("This field is required"),
            message: yup.string().required("This field is required"),
        })
        .required();

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
            placeholder: "Enter Your Name",
            inputtype: "text",
            label: true,
            inputLabel: "Name",
            width: "fullWidth"
        },
        {
            type: "input",
            name: "email",
            placeholder: "Enter Your Email",
            inputtype: "email",
            label: true,
            inputLabel: "Email",
            width: "fullWidth"
        },
        {
            type: "input",
            name: "phone",
            placeholder: "Enter Your Phone Number",
            inputtype: "text",
            label: true,
            inputLabel: "Phone",
            width: "fullWidth"
        },
        {
            type: "textarea",
            name: "message",
            placeholder: "Write Your Message Here",
            rows: 4,
            col: 10,
            exclass: "helpformHeight",
            label: true,
            inputLabel: "Message",
            customClass: "contactUs",
        },
    ];

    const onSubmit = async (val: any) => {
        setLoading(true)
        await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/contact-us-forms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    name: val.name,
                    email: val.email,
                    phone: val.phone,
                    message: val.message,
                },
            }),
        })
            .then(response => {
                setLoading(false);
                setDataSends(true);
                setSending("Thank you for registering your interest. One of our representatives will be in touch with you shortly.")
                setTimeout(() => {
                    setDataSends(false);
                    reset();
                }, 3000);
                return response.json()
            })
            .then(data => console.log(data))
            .catch(error => {
                setDataSends(true);
                setTimeout(() => {
                    setDataSends(false);
                }, 3000);
                setSending("Something Went Wrong!");
                return console.error('Error:', error)
            });
    }

    return (
        <section className={`section ${style.contactWrapper}`}>
            <div className='bg-wrapper-custom'>
                <div className='gred'></div>
                <Image src={"/assets/images/contact/bg-img.png"} alt='bg-img' width={1920} height={1559} />
            </div>
            <div className={style.contactContainer}>
                <div className="container">
                    <div className='custom-row'>
                        <div className="col_12 col_xl_5 col_md_12">
                            <Heading title={title} subTitle={subtitle} />
                            <p>{desc}</p>
                        </div>
                    </div>
                    <div className={style.infoDetail}>
                        <div className="custom-row">
                            <div className="col_12 col_xl_3 col_lg_6 col_md_6">
                                <div className={style.contactList}>
                                    <div className={style.iconWrapper}>
                                        <Image src={locationIcon} alt="location" width={23} height={24} />
                                    </div>
                                    <div className={style.textWrapper}>
                                        <h6 className={`h6 ${style.title}`}>{locationTitle}</h6>
                                        {locationArray?.map((item: any, index: number) =>
                                            <Link key={index} target={item?.ctaTarget} href={item?.ctaLink} className={`p fw-500 ${style.desc}`}>{item?.ctaText}</Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col_12 col_xl_3 col_lg_6 col_md_6">
                                <div className={style.contactList}>
                                    <div className={style.iconWrapper}>
                                        <Image src={emailIcon} alt="location" width={23} height={24} />
                                    </div>
                                    <div className={style.textWrapper}>
                                        <h6 className={`h6 ${style.title}`}>{emailTitle}</h6>
                                        {data.map((email: any, index: number) => (
                                            <Link key={index} href={`mailto:${email.ctaText}`} className={`fw-500 ${style.linkItem}`}>
                                                {email.ctaText} &nbsp;
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col_12 col_xl_3 col_lg_6 col_md_6">
                                <div className={style.contactList}>
                                    <div className={style.iconWrapper}>
                                        <Image src={phoneIcon} alt="location" width={23} height={24} />
                                    </div>
                                    <div className={style.textWrapper}>
                                        <h6 className={`h6 ${style.title}`}>{phoneTitle}</h6>
                                        {data2.map((number: any, index: number) => (
                                            <Link key={index} href={`tel:${number.ctaText}`} className={`fw-500 ${style.linkItem}`}>
                                                {number.ctaText} &nbsp;
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col_12 col_xl_3 col_lg_6 col_md_6">
                                <div className={style.contactList}>
                                    <div className={style.iconWrapper}>
                                        <Image src={shareIcon} alt="location" width={23} height={24} />
                                    </div>
                                    <div className={style.textWrapper}>
                                        <h6 className={`h6 ${style.title}`}>{smTitle}</h6>
                                        <ul className={style.socialList}>
                                            {values?.map((sItem: any, index: number) => (
                                                <li key={index}>
                                                    <Link target="_blank" href={`${sItem.ctaLink}`} className={`fw-500 ${style.linkItem}`}>
                                                        <Image alt="" width={19} height={18} src={sItem?.img?.data?.attributes?.url} />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="custom-row">
                        <div className="col_12 col_xl_6 col_lg_6 col_md_4">
                            <div className={style.imgWrapper}>
                                {img && <Image alt="contact-us" width={871} height={849} src={img} />}
                            </div>
                        </div>
                        <div className="col_12 col_xl_6 d-flex align-item-center col_lg_6 col_md_8">
                            <div className={style.formWrapper}>
                                <div className={style.headingWrapper}>
                                    <Heading title={formSubtitle} subTitle={formTitle} />
                                </div>
                                <p className="fw-500">{formDesc}</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {fields.map((item: any, i: number) => (
                                        <Fragment key={i}>
                                            <FormGroup control={control} errors={errors} item={item} />
                                        </Fragment>
                                    ))}
                                    <div className="col_12">
                                        <AnchorButton
                                            isDisabled={loading ? true : false}
                                            title={loading ? <div className={style.spinWrapper}><SpinLoader color={"white"} size={"small"} /></div> : "Submit"}
                                            type="button"
                                            buttonType="submit"
                                            color="purple"

                                        />
                                    </div>
                                    {dataSends &&
                                        <div className="col_12">
                                            <div className={`${style.successWrapper}`}>
                                                <p className={style.titleSuccess}>{sending}</p>
                                            </div>
                                        </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ContactUsComp