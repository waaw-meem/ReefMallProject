import React, { Fragment, memo, useEffect, useState } from "react";
import style from "../index.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormGroup from "@/app/component/Form/FormGroup";
import { useUploadImageMutation } from "@/redux/reducers/UploadSlice/UploadApiSlice";
import {
  useCreateOfferMutation,
  useLazyGetOfferByIdQuery,
  useUpdateOfferByIdMutation,
} from "@/redux/reducers/OutletApiSlice/OutletApiSlice";
import { toast } from "react-toastify";
import SpinLoader from "@/app/component/Loader/SpinLoader";

interface ImageInfo {
  name: string;
  url: string;
  type: string;
}

const init = {
  title: "",
  sliderBottomImg: [],
  sliderLeftImg: [],
  desktopImgUrl: [],
  mainImgUrl: [],
  mobileImgUrl: [],
  richTextCopy: "",
  date: [],
};

const fields = [
  {
    type: "input",
    name: "title",
    inputtype: "text",
    label: true,
    inputLabel: "Title ",
    width: "fullWidth",
  },
  {
    type: "upload",
    name: "desktopImgUrl",
    placeholder: "desktop *",
    label: true,
    inputLabel: "Banner Desktop Image* (1920X600) max upload size 30MB ",
    exclass: "galleryInput",
    id: "desktopImgUrl-image",
    searchCustom: "brandVideoLabel",
    thumb: true,
  },
  {
    type: "upload",
    name: "mobileImgUrl",
    placeholder: "mobile *",
    label: true,
    inputLabel: "Banner Mobile Image* (480X500) max upload size 30MB ",
    exclass: "galleryInput",
    id: "mobileImgUrl-image",
    searchCustom: "brandVideoLabel",
    thumb: true,
  },
  {
    type: "upload",
    name: "sliderBottomImg",
    placeholder: "banner *",
    label: true,
    inputLabel: "Slider Bottom Image* (1050X240) max upload size 30MB ",
    exclass: "galleryInput",
    id: "sliderBottomImg-image",
    searchCustom: "brandVideoLabel",
    thumb: true,
  },
  {
    type: "upload",
    name: "sliderLeftImg",
    placeholder: "Main image *",
    label: true,
    inputLabel: "Slider Left Image* (590X857) max upload size 30MB ",
    exclass: "galleryInput",
    id: "sliderLeftImg-image",
    searchCustom: "brandVideoLabel",
    thumb: true,
  },
  {
    type: "upload",
    name: "mainImgUrl",
    placeholder: "first section *",
    label: true,
    inputLabel: "Main Image* (870X597) max upload size 30MB ",
    exclass: "galleryInput",
    id: "mainImgUrl-image",
    searchCustom: "brandVideoLabel",
    thumb: true,
  },
  {
    type: "ckeditorfield",
    name: "richTextCopy",
    exclass: "helpformHeight",
    label: true,
    customClass: "updateBrands",
    inputLabel: "Description*",
  },
  // {
  //   type: "textarea",
  //   name: "description",
  //   rows: 4,
  //   col: 10,
  //   exclass: "helpformHeight",
  //   label: true,
  //   customClass: "BrandVideo",
  //   inputLabel: "Description",
  //   bottomLabel:
  //     "You are advised to include the offer timeline. The Mall Management is not responsible if any brand offer is visible to the customers beyond the offer expiry.",
  // },
  {
    type: "date",
    name: "date",
    heading: "Date",
    placeholder: "MM/DD/YYYY",
    inputtype: "date",
    label: true,
    width: "fullWidth",
    inputLabel: "Select Offer Display Timeline",
    rangePicker: true,
  },
];

const OffersAndPromotionsTab = (props: any) => {
  const { offerID, handleRevertOfferId } = props;
  const [formData, setFormData] = useState(init);
  const [updateOfferById] = useUpdateOfferByIdMutation();
  const [getOfferById, { data: offerData, error, isLoading: getLoading }] =
    useLazyGetOfferByIdQuery();
  const [uploadImage, { isLoading: uploadImageLoad }] =
    useUploadImageMutation();
  const [createOffer, { isLoading: createOfferLoading }] =
    useCreateOfferMutation();

  const [loading, setLoading] = useState(false);
  const [sliderLeftImg, setMainImgUrl] = useState<any>([]);
  const [sliderBottomImg, setBannerImgUrl] = useState<any>([]);
  const [desktopImgUrl, setDesktopImgUrl] = useState<any>([]);
  const [mainImgUrl, setFirstSectionImgUrl] = useState<any>([]);
  const [mobileImgUrl, setMobileImgUrl] = useState<any>([]);
  const [resetTrigger, setResetTrigger] = useState<any>(false);
  const schema = yup.object().shape({
    title: yup.string().required("This Field is required"),
    sliderBottomImg: yup
      .mixed()
      .test("required", "You need to provide a file", (file: any) => {
        if (file.length) return true;
        return false;
      })
      .test("fileType", "Upload only Image File Type", (value: any) => {
        if (!value) return true;
        return Array.from(value)?.every((file: any) =>
          ["image/jpeg", "image/png", "url"].includes(file.type)
        );
      }),
    sliderLeftImg: yup
      .mixed()
      .test("required", "You need to provide a file", (file: any) => {
        if (file.length) return true;
        return false;
      })
      .test("fileType", "Upload only Image File Type", (value: any) => {
        if (!value) return true;
        return Array.from(value)?.every((file: any) =>
          ["image/jpeg", "image/png", "url"].includes(file.type)
        );
      }),
    desktopImgUrl: yup
      .mixed()
      .test("required", "You need to provide a file", (file: any) => {
        if (file.length) return true;
        return false;
      })
      .test("fileType", "Upload only Image File Type", (value: any) => {
        if (!value) return true;
        return Array.from(value)?.every((file: any) =>
          ["image/jpeg", "image/png", "url"].includes(file.type)
        );
      }),
    mainImgUrl: yup
      .mixed()
      .test("required", "You need to provide a file", (file: any) => {
        if (file.length) return true;
        return false;
      })
      .test("fileType", "Upload only Image File Type", (value: any) => {
        if (!value) return true;
        return Array.from(value)?.every((file: any) =>
          ["image/jpeg", "image/png", "url"].includes(file.type)
        );
      }),
    mobileImgUrl: yup
      .mixed()
      .test("required", "You need to provide a file", (file: any) => {
        if (file.length) return true;
        return false;
      })
      .test("fileType", "Upload only Image File Type", (value: any) => {
        if (!value) return true;
        return Array.from(value)?.every((file: any) =>
          ["image/jpeg", "image/png", "url"].includes(file.type)
        );
      }),

    // richTextCopy: yup
    //   .string()
    //   .test("non-empty-html", "This field is required", (value: any) => {
    //     return value && value.trim() !== "<p><br></p>";
    //   }),
    date: yup
      .array()
      .of(yup.date())
      .test(
        "check",
        "Please Select both Start and End Dates",
        (value, context) => {
          if (value && value[1]) {
            return !!value;
          }
        }
      ),
  });

  const validateSchema: any = schema;
  const [load, setLoad] = useState(true);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (offerID) {
      setLoad(true);
      getOfferById(offerID?.slug);
    }
  }, [offerID]);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ sliderBottomImg:", sliderBottomImg);
    setValue("sliderBottomImg", sliderBottomImg);
    setValue("sliderLeftImg", sliderLeftImg);
    setValue("desktopImgUrl", desktopImgUrl);
    setValue("mainImgUrl", mainImgUrl);
    setValue("mobileImgUrl", mobileImgUrl);
  }, [
    sliderBottomImg,
    desktopImgUrl,
    mainImgUrl,
    sliderLeftImg,
    mobileImgUrl,
    setValue,
  ]);

  useEffect(() => {
    if (!error && offerData) {
      if (offerData) {
        const {
          sliderBottomImg,
          sliderLeftImg,
          desktopImgUrl,
          mainImgUrl,
          mobileImgUrl,
          startDate,
          endDate,
          title,
          richTextCopy,
        } = offerData?.data?.attributes;
        let bannerImg: any = sliderBottomImg
          ? [{ name: sliderBottomImg, url: sliderBottomImg, type: "url" }]
          : [];
        // console.log("🚀 ~ useEffect ~ bannerImg:", bannerImg);
        let mainImg: any = sliderLeftImg
          ? [{ name: sliderLeftImg, url: sliderLeftImg, type: "url" }]
          : [];
        let desktopImg: any = desktopImgUrl
          ? [{ name: desktopImgUrl, url: desktopImgUrl, type: "url" }]
          : [];
        let firstSectionImg: any = mainImgUrl
          ? [{ name: mainImgUrl, url: mainImgUrl, type: "url" }]
          : [];
        let mobileImg: any = mobileImgUrl
          ? [{ name: mobileImgUrl, url: mobileImgUrl, type: "url" }]
          : [];

        setBannerImgUrl(bannerImg);
        setDesktopImgUrl(desktopImg);
        setMainImgUrl(mainImg);
        setMobileImgUrl(mobileImg);
        setFirstSectionImgUrl(firstSectionImg);

        setValue("title", title);
        // TODO: rich text in desc
        setValue("richTextCopy", richTextCopy);
        setValue("date", [startDate, endDate]);
        setValue("sliderBottomImg", bannerImg);
        setValue("sliderLeftImg", mainImg);
        setValue("desktopImgUrl", desktopImg);
        setValue("mainImgUrl", firstSectionImg);
        setValue("mobileImgUrl", mobileImg);
      }
      setLoad(false);
    }
    setLoad(false);
  }, [offerData]);

  const onSubmit = async (data: any) => {
    if (data.richTextCopy == "") {
      toast.error("Please provide the description");
      return;
    }
    setLoading(true);
    try {
      let sliderBottomImg;
      let sliderLeftImg;
      let desktopImgUrl;
      let mobileImgUrl;
      let mainImgUrl;
      let bid: any = sessionStorage.getItem("bid");

      if (data?.sliderBottomImg && data?.sliderBottomImg[0]?.type !== "url") {
        sliderBottomImg = await uploadImage(data?.sliderBottomImg[0]).unwrap();
      }
      if (data?.desktopImgUrl && data?.desktopImgUrl[0]?.type !== "url") {
        desktopImgUrl = await uploadImage(data?.desktopImgUrl[0]).unwrap();
      }
      if (data?.mobileImgUrl && data?.mobileImgUrl[0]?.type !== "url") {
        mobileImgUrl = await uploadImage(data?.mobileImgUrl[0]).unwrap();
      }
      if (data?.sliderLeftImg && data?.sliderLeftImg[0]?.type !== "url") {
        sliderLeftImg = await uploadImage(data?.sliderLeftImg[0]).unwrap();
      }
      if (data?.mainImgUrl && data?.mainImgUrl[0]?.type !== "url") {
        mainImgUrl = await uploadImage(data?.mainImgUrl[0]).unwrap();
      }

      let payload = {
        title: data?.title,
        // TODO: rich text in desc
        richTextCopy: data?.richTextCopy,
        startDate: moment(data?.date[0]).format("YYYY-MM-DD"),
        endDate: moment(data?.date[1]).format("YYYY-MM-DD"),
        sliderBottomImg:
          data?.sliderBottomImg[0]?.type !== "url"
            ? sliderBottomImg[0]?.url
            : data?.sliderBottomImg[0]?.url,
        sliderLeftImg:
          data?.sliderLeftImg[0]?.type !== "url"
            ? sliderLeftImg[0]?.url
            : data?.sliderLeftImg[0]?.url,
        desktopImgUrl:
          data?.desktopImgUrl[0]?.type !== "url"
            ? desktopImgUrl[0]?.url
            : data?.desktopImgUrl[0]?.url,
        mobileImgUrl:
          data?.mobileImgUrl[0]?.type !== "url"
            ? mobileImgUrl[0]?.url
            : data?.mobileImgUrl[0]?.url,
        mainImgUrl:
          data?.mainImgUrl[0]?.type !== "url"
            ? mainImgUrl[0]?.url
            : data?.mainImgUrl[0]?.url,
        brand: {
          set: [{ id: bid }],
        },
      };

      if (offerID?.id) {
        const updateResponse = await updateOfferById({
          oid: offerID?.id,
          data: payload,
        }).unwrap();
        reset();
        setFormData(init);
        setBannerImgUrl([]);
        setDesktopImgUrl([]);
        setMainImgUrl([]);
        setMobileImgUrl([]);
        setMainImgUrl([]);
        setResetTrigger(true);
        toast.success("Offer updated Successfully");
      } else {
        const response = await createOffer(payload).unwrap();

        reset();
        setFormData(init);
        setBannerImgUrl([]);
        setDesktopImgUrl([]);
        setMainImgUrl([]);
        setMobileImgUrl([]);
        setMainImgUrl([]);
        setResetTrigger(true);
        toast.success("Offer created Successfully");
      }
    } catch (error) {
      if (error?.data?.error?.message == "Your request is submitted!") {
        toast.success("Your information is pending administrative review.");
        setFormData(init);
        reset();
        setBannerImgUrl([]);
        setDesktopImgUrl([]);
        setMainImgUrl([]);
        setMobileImgUrl([]);
        setMainImgUrl([]);
        setResetTrigger(true);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resetTrigger) {
      setTimeout(() => {
        setResetTrigger(false);
      }, 1000);
    }
  }, [resetTrigger]);

  if (getLoading) return <SpinLoader size={"small"} />;
  if (load) return <SpinLoader size={"small"} />;

  return (
    <section className={style.offerPromotionSection}>
      <div className={style.offerPromotion}>
        <h6 className={style.dash_cardTitle}>
          {offerID ? "Update Offer" : "Add Offer"}
        </h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`form-outlet ${style.formWrapper}`}>
            <div className="custom-row">
              <div className="col_12 col_xl_6">
                <div className="custom-row">
                  {fields.map((item: any, i: number) => {
                    const images: any = {
                      sliderBottomImg: sliderBottomImg,
                      sliderLeftImg: sliderLeftImg,
                      mobileImgUrl: mobileImgUrl,
                      desktopImgUrl: desktopImgUrl,
                      mainImgUrl: mainImgUrl,
                    };

                    return (
                      <Fragment key={i}>
                        <FormGroup
                          getValues={getValues}
                          setValue={setValue}
                          control={control}
                          errors={errors}
                          item={item}
                          images={images[item?.name]}
                          resetTrigger={resetTrigger}
                        />
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className={style.buttonSubmit}>
            {/* {!uploadImageLoad || !createOfferLoading ? ( */}
            {!loading ? (
              <button type="submit" className={style.gradientButton}>
                <span className={style.btn}>
                  {offerID ? "Update Offer" : "Add Offer"}
                </span>
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

export default OffersAndPromotionsTab;
