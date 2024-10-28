import React, { Fragment, useEffect, useRef, useState } from "react";
import style from "../index.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import FormGroup from "@/app/component/Form/FormGroup";
import {
  useLazyGetBrandInfoDetailsQuery,
  usePostBrandInfoMutation,
  useConectBrandByVendorMutation,
  useUpdateBrandInfoMutation,
  useLazyGetAllSubCategoriesByCategoryIDQuery,
} from "@/redux/reducers/OutletApiSlice/OutletApiSlice";
import { toast } from "react-toastify";
import { useUploadImageMutation } from "@/redux/reducers/UploadSlice/UploadApiSlice";
import SpinLoader from "@/app/component/Loader/SpinLoader";
import { useSession } from "next-auth/react";
import { OutletActionCalls } from "@/redux/reducers/OutletApiSlice/OutletSlice";

const init = {
  logoUrl: [],
  desktopImgUrl: [],
  mobileImgUrl: [],
  introductionImgUrl: [],
  brandInfoImgUrl: [],
  brandtitle: "",
  richTextCopy: "",
  type: {
    name: "",
    id: "",
  },
  category: {
    name: "",
    id: "",
  },
};

const type = [
  {
    name: "Shop",
    id: "Shop",
  },
  {
    name: "Eat",
    id: "Eat",
  },
];

const BrandInfoTab = (props: any) => {
  const [typeSelected, setTypeSelected] = useState("");
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const fields = [
    {
      type: "upload",
      name: "logoUrl",
      placeholder: "Logo *",
      label: true,
      inputLabel: "Logo* (270x28)PX ",
      exclass: "customLogo",
      id: "customLogo",
      bottomLabel: "Max upload size  30MB  (png, svg, Jpeg) ",
    },
    {
      type: "upload",
      name: "desktopImgUrl",
      placeholder: "Banner *",
      label: true,
      inputLabel: "Desktop Banner Image* (1920x450)PX max upload size 30MB ",
      exclass: "customLogo",
      id: "customBanner",
    },
    {
      type: "upload",
      name: "mobileImgUrl",
      placeholder: "Banner *",
      label: true,
      inputLabel: "Mobile Banner Image* (1920x450)PX max upload size 30MB ",
      exclass: "customLogo",
      id: "customBanner1",
    },
    {
      type: "upload",
      name: "introductionImgUrl",
      placeholder: "Banner *",
      label: true,
      inputLabel: "Introduction Image* (1920x450)PX max upload size 30MB ",
      exclass: "customLogo",
      id: "customBanner2",
    },
    {
      type: "upload",
      name: "brandInfoImgUrl",
      placeholder: "Banner *",
      label: true,
      inputLabel: "Brand Information Image* (1920x450)PX max upload size 30MB ",
      exclass: "customLogo",
      id: "customBanner3",
    },

    {
      type: "input",
      name: "brandtitle",
      placeholder: "Forever 21 ",
      inputtype: "text",
      label: true,
      inputLabel: "Brand Title *",
      exclass: "updateBrands",
      searchCustom: "updateBrand",
      heading: true,
      headingText: "Update Brands",
      width: "fullWidth",
    },
    {
      type: "select",
      name: "type",
      placeholder: "Select Category",
      inputtype: "select",
      labelShow: true,
      selectLabel: "Category*",
      options: type,
      onChange: (e: any) => {
        setTypeSelected(e.value)
        setValue('category', [])
      },
    },
    {
      type: "select",
      name: "category",
      placeholder: "Select Sub Category",
      inputtype: "select",
      labelShow: true,
      selectLabel: "Sub Category*",
      options: typeSelected ? category : [],
      multiple: true,
    },
    {
      type: "ckeditorfield",
      name: "richTextCopy",
      exclass: "helpformHeight",
      label: true,
      customClass: "updateBrands",
      inputLabel: "Description*",
    },
  ];
  const { checkIfAlready, brandSlug, subCategories } = props;
  const { data: session } = useSession();
  const [getSubCategories, { data: subcategories, isLoading: categoriesLoad }] =
    useLazyGetAllSubCategoriesByCategoryIDQuery();
  const [getBrandInfoDetails, { data: infoDetails, error, isLoading }] =
    useLazyGetBrandInfoDetailsQuery();
  const [postBrandInfo, { isLoading: postBrandInfoLoad }] =
    usePostBrandInfoMutation();
  const [updateBrandInfo, { isLoading: updateBrandInfoLoad }] =
    useUpdateBrandInfoMutation();
  const [uploadImage, { isLoading: uploadImageLoad }] =
    useUploadImageMutation();
  const [conectBrandByVendor, { isLoading: connectLoad }] =
    useConectBrandByVendorMutation();
  const [formData, setFormData] = useState<any>({
    logoUrl: [],
    desktopImgUrl: [],
    mobileImgUrl: [],
    introductionImgUrl: [],
    brandInfoImgUrl: [],
    brandtitle: "",
    richTextCopy: "",
  });
  const [first, setFirst] = useState(0);
  const firstRender = useRef(true);

  const schema = yup.object().shape({
    logoUrl: yup
      .mixed()
      .test("required", "You need to provide a file", (file: any) => {
        if (file.length) return true;
        return false;
      })
      .test("fileType", "Upload only Image File Type", (value: any) => {
        if (!value) return true;
        return Array.from(value)?.every((file: any) =>
          ["image/jpeg", "image/png", "image/svg+xml", "url"].includes(
            file.type
          )
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
    introductionImgUrl: yup
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
    brandInfoImgUrl: yup
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
    brandtitle: yup.string().required("This Field is required"),
    richTextCopy: yup.string().required("This Field is required"),
    type: yup.mixed().required("Category is required"),
    category: yup.array().min(1, "Select atleast one"),
  });

  const validateSchema: any = schema;

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
  // useEffect(() => {
  //   console.log("asd", category);
  // }, [category]);
  useEffect(() => {
    if (typeSelected !== "") {
      (async () => {
        const data = await getSubCategories(typeSelected);
        if (data?.data) {
          let options = data?.data?.data?.map((item: any) => {
            return {
              name: item?.attributes?.title,
              id: item?.id,
            };
          });
          setCategory(options);
        }

        // const category = [
        //     {
        //       name: "item1",
        //       id: "shop",
        //     },
        //     {
        //       name: "item2",
        //       id: "dine",
        //     },
        //     {
        //       name: "item3",
        //       id: "entertainment",
        //     },
        //   ];
      })();
    }
  }, [typeSelected]);

  useEffect(() => {
    if (firstRender?.current) {
      firstRender.current = false;
      return;
    }
    // committed
    if (first > 1) {
      setValue("category", []);
    }

    setFirst((prev) => prev + 1);
  }, [typeSelected]);

  useEffect(() => {
    // let bid: any = sessionStorage.getItem("bid");
    let bid: any = sessionStorage.getItem("brandSlug");
    if (bid) {
      getBrandInfoDetails(bid);
    }
    if (brandSlug) {
      getBrandInfoDetails(brandSlug);
    }
  }, [brandSlug]);

  useEffect(() => {
    if (!error && infoDetails) {
      dispatch(OutletActionCalls.GetBrand(infoDetails?.data));
      const {
        desktopImgUrl,
        mobileImgUrl,
        logoUrl,
        title,
        // email,
        // phone,
        richTextCopy,
        // slug,
        // businessHours,
        type,
        // islatestOpening,
        introductionImgUrl,
        brandInfoImgUrl,
        // brandGalleryDetails,
        // socialMedia,
        // videoSection,
        // brand_offers,
        // seo,
      } = infoDetails?.data?.attributes;
      const { brand_categories } = infoDetails?.data?.attributes;
      setValue(
        "category",
        brand_categories?.data?.map((item: any) => {
          const obj = {
            label: item?.attributes?.title,
            value: item?.id,
          };

          return obj;
        })
      );

      setValue(
        "logoUrl",
        logoUrl ? [{ name: logoUrl, url: logoUrl, type: "url" }] : []
      );
      setValue(
        "desktopImgUrl",
        desktopImgUrl
          ? [{ name: desktopImgUrl, url: desktopImgUrl, type: "url" }]
          : []
      );
      setValue(
        "mobileImgUrl",
        mobileImgUrl
          ? [{ name: mobileImgUrl, url: mobileImgUrl, type: "url" }]
          : []
      );
      setValue(
        "introductionImgUrl",
        introductionImgUrl
          ? [{ name: introductionImgUrl, url: introductionImgUrl, type: "url" }]
          : []
      );
      setValue(
        "brandInfoImgUrl",
        brandInfoImgUrl
          ? [{ name: brandInfoImgUrl, url: brandInfoImgUrl, type: "url" }]
          : []
      );
      setValue("brandtitle", title || "");
      setValue("richTextCopy", richTextCopy || "");

      setTypeSelected(type);
      setValue("type", {
        label: type,
        value: type,
      });
    }
  }, [infoDetails]);

  const onSubmit = async (data: any) => {
    if (data.richTextCopy == "") {
      toast.error("Please provide the description");
      return;
    }
    try {
      let logoUrl;
      let desktopImgUrl;
      let mobileImgUrl;
      let introductionImgUrl;
      let brandInfoImgUrl;

      if (data?.logoUrl && data?.logoUrl[0]?.type !== "url") {
        logoUrl = await uploadImage(data?.logoUrl[0]).unwrap();
      }
      if (data?.desktopImgUrl && data?.desktopImgUrl[0]?.type !== "url") {
        desktopImgUrl = await uploadImage(data?.desktopImgUrl[0]).unwrap();
      }
      if (data?.mobileImgUrl && data?.mobileImgUrl[0]?.type !== "url") {
        mobileImgUrl = await uploadImage(data?.mobileImgUrl[0]).unwrap();
      }
      if (
        data?.introductionImgUrl &&
        data?.introductionImgUrl[0]?.type !== "url"
      ) {
        introductionImgUrl = await uploadImage(
          data?.introductionImgUrl[0]
        ).unwrap();
      }
      if (data?.brandInfoImgUrl && data?.brandInfoImgUrl[0]?.type !== "url") {
        brandInfoImgUrl = await uploadImage(data?.brandInfoImgUrl[0]).unwrap();
      }

      let payload = {
        title: data?.brandtitle,
        richTextCopy: data?.richTextCopy,
        type: data?.type.value,
        ...(logoUrl && logoUrl[0]
          ? { logoUrl: logoUrl[0].url }
          : { logoUrl: data?.logoUrl[0].url }),
        ...(desktopImgUrl && desktopImgUrl[0]
          ? { desktopImgUrl: desktopImgUrl[0].url }
          : { desktopImgUrl: data?.desktopImgUrl[0].url }),
        ...(mobileImgUrl && mobileImgUrl[0]
          ? { mobileImgUrl: mobileImgUrl[0].url }
          : { mobileImgUrl: data?.mobileImgUrl[0].url }),
        ...(introductionImgUrl && introductionImgUrl[0]
          ? { introductionImgUrl: introductionImgUrl[0].url }
          : { introductionImgUrl: data?.introductionImgUrl[0].url }),
        ...(brandInfoImgUrl && brandInfoImgUrl[0]
          ? { brandInfoImgUrl: brandInfoImgUrl[0].url }
          : { brandInfoImgUrl: data?.brandInfoImgUrl[0].url }),
      };

      const alreadyExists = await checkIfAlready(session?.user).unwrap();
      let response;

      if (alreadyExists?.brand) {
        response = await updateBrandInfo({
          bid: alreadyExists?.brand?.id,
          payload,
          sId: data?.category?.map((item: any) => {
            return item?.value;
          }),
        }).unwrap();
        if (response?.data && response?.data?.id) {
          sessionStorage.setItem("bid", response?.data?.id);
          sessionStorage.setItem("brandSlug", response?.data?.slug);
          const connectResponse = await conectBrandByVendor({
            user: session?.user,
            connectData: { id: response?.data?.id },
          }).unwrap();

          await getBrandInfoDetails(response?.data?.slug);
          toast.success("Success!");
          return;
        }
      } else {
        response = await postBrandInfo({
          payload,
          userId: session?.user?.id,
          sId: data?.category?.map((item: any) => {
            return item?.value;
          }),
          // sId: data?.category?.value,
        }).unwrap();
        if (response?.data && response?.data?.id) {
          sessionStorage.setItem("bid", response?.data?.id);
          sessionStorage.setItem("brandSlug", response?.data?.slug);
          const connectResponse = await conectBrandByVendor({
            user: session?.user,
            connectData: { id: response?.data?.id },
          }).unwrap();

          await getBrandInfoDetails(response?.data?.slug);
          toast.success("Success!");
          return;
        }
      }

      toast.success("Something went wrong!");
    } catch (error: any) {
      if (error?.data?.error?.message == "Your request is submitted!") {
        toast.success("Your information is pending administrative review.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <section className={style.brandInfo}>
      <div className={style.updateMedia}>
        <h6 className={style.dash_cardTitle}>Update Media</h6>
        <div className={style.inputContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputWrapper}>
              <div className="custom-row">
                {fields.map((item: any, i: number) => (
                  <Fragment key={i}>
                    <FormGroup
                      getValues={getValues}
                      setValue={setValue}
                      control={control}
                      errors={errors}
                      item={item}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
            <div className={style.buttonSubmit}>
              {uploadImageLoad || postBrandInfoLoad || updateBrandInfoLoad ? (
                <button disabled={true} className={style.gradientButton}>
                  <span className={style.btn}>
                    <SpinLoader size={"small"} />
                  </span>
                </button>
              ) : (
                <button type="submit" className={style.gradientButton}>
                  <span className={style.btn}>{"Save"}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BrandInfoTab;
