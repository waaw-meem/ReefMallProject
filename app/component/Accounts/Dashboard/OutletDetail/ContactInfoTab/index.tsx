import React, { Fragment, useEffect, useState } from "react";
import style from "../index.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EmailRegex, PhoneRegex } from "@/app/utilities/utility";
import {
  useLazyGetBrandContactDetailsQuery,
  useUpdateBrandContactInfoMutation,
} from "@/redux/reducers/OutletApiSlice/OutletApiSlice";
import { toast } from "react-toastify";
import FormGroup from "@/app/component/Form/FormGroup";
import SpinLoader from "@/app/component/Loader/SpinLoader";
import mailIcon from "../../../../../../public/assets/svg/mail.svg";
import phoneIcon from "../../../../../../public/assets/svg/phone.svg";
import facebookIcon from "../../../../../../public/assets/svg/social/facebook.svg";
import instaIcon from "../../../../../../public/assets/svg/social/insta.svg";
import youtubeIcon from "../../../../../../public/assets/svg/social/youtube.svg";
import tiktokIcon from "../../../../../../public/assets/svg/social/tikTok.svg";
import timeIcon from "../../../../../../public/assets/svg/time2-white.svg";

const init = {
  email: "",
  phone: "",
  facebook: "",
  instagram: "",
  youtube: "",
  tiktok: "",
  dayTime: "",
  // parking: "",
};

interface SocialImages {
  [key: string]: string;
}
let socialImages: SocialImages = {
  // changes required
  facebook: "",
  instagram: "",
  youtube: "",
  tiktok: "",
};
// let socialImages: SocialImages = {
//   facebook: `${process.env.BUCKET_URL}/fb_logo_55a47701fd.svg`,
//   instagram: `${process.env.BUCKET_URL}/instagram_logo_a38f81d574.svg`,
//   youtube: `${process.env.BUCKET_URL}/icons8_youtube_4db2be3c1e.svg`,
//   tiktok: `${process.env.BUCKET_URL}/icons8_tiktok_be32354af6.svg`,
// };

// let socialImages: SocialImages = {
//     facebook:
//       "https://burjumanbucket.s3.me-central-1.amazonaws.com/fb_logo_55a47701fd.svg",
//     instagram:
//       "https://burjumanbucket.s3.me-central-1.amazonaws.com/instagram_logo_a38f81d574.svg",
//     youtube:
//       "https://burjumanbucket.s3.me-central-1.amazonaws.com/icons8_youtube_89862ae060.svg?updatedAt=2024-04-03T08%3A14%3A39.103Z",
//     tiktok:
//       "https://burjumanbucket.s3.me-central-1.amazonaws.com/icons8_tiktok_cae3023701.svg?updatedAt=2024-04-03T08%3A16%3A30.313Z",
//   };

const ContactInfoTab = (props: any) => {
  // const brandData = useSelector(selectOutlet);
  const [
    getBrandContactDetails,
    { data: contactDetails, error, isLoading: getLoading },
  ] = useLazyGetBrandContactDetailsQuery();

  const [updateBrandContactInfo, { isLoading }] =
    useUpdateBrandContactInfoMutation();
  const [formData, setFormData] = useState(init);
  const schema = yup.object({
    email: yup
      .string()
      .matches(EmailRegex, {
        message: "Please enter a valid phone email",
        excludeEmptyString: true,
      })
      .required("This Field is required"),
    dayTime: yup.string().max(80, "Max 80 characters"),
    phone: yup
      .string()
      .matches(PhoneRegex, {
        message: "Please enter a valid phone number",
        excludeEmptyString: true,
      })
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
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: formData,
  });

  const fields = [
    {
      type: "input",
      name: "email",
      placeholder: "f21.bjc@sharafretail.com *",
      inputtype: "email",
      label: true,
      inputLabel: "Email*",
      searchCustom: "socialIcon",
      exclass: "updateBrands",
      icon: true,
      iconUrl: mailIcon,
    },
    {
      type: "input",
      name: "phone",
      placeholder: "+971 4 3277488",
      inputtype: "text",
      label: true,
      inputLabel: "Contact number*",
      searchCustom: "socialIcon",
      exclass: "updateBrands",
      icon: true,
      iconUrl: phoneIcon,
    },

    // {
    //   type: "input",
    //   name: "facebook",
    //   placeholder: "Enter complete URL ",
    //   inputtype: "text",
    //   label: true,
    //   inputLabel: "Facebook",
    //   heading: true,
    //   headingText: "Social Handles",
    //   searchCustom: "socialIcon",
    //   exclass: "updateBrands",
    //   icon: true,
    //   iconUrl: facebookIcon,
    // },
    // {
    //   type: "input",
    //   name: "instagram",
    //   placeholder: "Enter complete URL ",
    //   inputtype: "text",
    //   label: true,
    //   inputLabel: "Instagram",
    //   searchCustom: "socialIcon",
    //   exclass: "updateBrands",
    //   icon: true,
    //   iconUrl: instaIcon,
    // },
    // {
    //   type: "input",
    //   name: "youtube",
    //   placeholder: "Enter complete URL ",
    //   inputtype: "text",
    //   label: true,
    //   inputLabel: "Youtube",
    //   searchCustom: "socialIcon",
    //   exclass: "updateBrands",
    //   icon: true,
    //   iconUrl: youtubeIcon,
    // },
    // {
    //   type: "input",
    //   name: "tiktok",
    //   placeholder: "Enter complete URL ",
    //   inputtype: "text",
    //   label: true,
    //   inputLabel: "Tiktok",
    //   searchCustom: "socialIcon",
    //   exclass: "updateBrands",
    //   icon: true,
    //   iconUrl: tiktokIcon,
    // },
    {
      type: "input",
      name: "dayTime",
      placeholder: "Monday-Thursday  (8am-5pm)",
      inputtype: "text",
      label: true,
      inputLabel: "Day & Time",
      heading: true,
      headingText: "Business Hours",
      searchCustom: "socialIcon",
      exclass: "updateBrands",
      icon: true,
      iconUrl: timeIcon,
    },
    // {
    //   type: "input",
    //   name: "parking",
    //   placeholder: "Level: Ground Floor / Parking: p3,",
    //   inputtype: "text",
    //   label: true,
    //   inputLabel: "Parking",
    //   heading: true,
    //   headingText: "Facilities",
    //   searchCustom: "socialIcon",
    //   exclass: "updateBrands",
    //   icon: true,
    //   iconUrl: parkingIcon,
    // },
  ];

  useEffect(() => {
    // let bid: any = sessionStorage.getItem("bid");
    let bid: any = sessionStorage.getItem("brandSlug");
    if (bid) {
      getBrandContactDetails(bid);
    }
  }, []);

  useEffect(() => {
    if (!error && contactDetails) {
      // if (brandData) {
      if (contactDetails?.data?.attributes) {
        const { businessHours, email, phone, socialMedia } =
          contactDetails?.data?.attributes;

        let facebook = socialMedia?.facebook;
        let instagram = socialMedia?.instagram;
        let youtube = socialMedia?.youtube;
        let tiktok = socialMedia?.tiktok;

        // let facebook = socialHandle.find(
        //   (social: any) => social?.title === "facebook"
        // );
        // let instagram = socialHandle.find(
        //   (social: any) => social?.title === "instagram"
        // );
        // let youtube = socialHandle.find(
        //   (social: any) => social?.title === "youtube"
        // );
        // let tiktok = socialHandle.find(
        //   (social: any) => social?.title === "tiktok"
        // );

        setValue("email", email || "");
        setValue("phone", phone || "");
        setValue("dayTime", businessHours || "");
        // setValue("parking", Facilities || "");
        setValue("facebook", facebook || "");
        setValue("instagram", instagram || "");
        setValue("youtube", youtube || "");
        setValue("tiktok", tiktok || "");
      }
    }
  }, [contactDetails]);

  const onSubmit = async (data: any) => {
    try {
      const socialMedia = {
        ...Object.fromEntries(
          Object.entries(data).filter(
            ([key, value]) =>
              (key === "youtube" ||
                key === "instagram" ||
                key === "facebook" ||
                key === "tiktok") &&
              value !== ""
          )
        ),
      };

      let payload = {
        email: data.email,
        phone: data.phone,
        ...(data?.dayTime !== "" ? { businessHours: data?.dayTime } : {}),
        // ...(data?.parking !== "" ? { Facilities: data?.parking } : {}),
        socialMedia: socialMedia,
      };
      let bid: any = sessionStorage.getItem("bid");
      let brandSlug: any = sessionStorage.getItem("brandSlug");

      const response = await updateBrandContactInfo({
        bid,
        contactInfo: payload,
      }).unwrap();
      getBrandContactDetails(brandSlug);
      toast.success("Success");
    } catch (error: any) {
      if (error?.data?.error?.message == "Your request is submitted!") {
        toast.success("Your information is pending administrative review.");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  if (getLoading) return <SpinLoader size={"small"} />;

  return (
    <section className={style.contactInfoSection}>
      <div className={style.contactInfo}>
        <h6 className={style.dash_cardTitle}>Contact info</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.formWrapper}>
            <div className="custom-row">
              {fields.map((item: any, i: number) => (
                <Fragment key={i}>
                  <FormGroup control={control} errors={errors} item={item} />
                </Fragment>
              ))}
            </div>
          </div>
          <div className={style.buttonSubmit}>
            {!isLoading ? (
              <button type="submit" className={style.gradientButton}>
                <span className={style.btn}>{"Save"}</span>
              </button>
            ) : (
              <button disabled className={style.gradientButton}>
                <span className={style.btn}>
                  <SpinLoader size={"small"} />
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactInfoTab;
