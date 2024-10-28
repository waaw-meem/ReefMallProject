import React, { Fragment, useEffect, useState } from "react";
import style from "../index.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUploadImageMutation } from "@/redux/reducers/UploadSlice/UploadApiSlice";
import {
  useLazyGetVideoDetailsQuery,
  useUpdateBrandVideoDetailsMutation,
} from "@/redux/reducers/OutletApiSlice/OutletApiSlice";
import { toast } from "react-toastify";
import FormGroup from "@/app/component/Form/FormGroup";
import SpinLoader from "@/app/component/Loader/SpinLoader";

const init = {
  title: "",
  // description: "",
  videolink: "",
  videoThumb: [],
};

const fields = [
  {
    type: "input",
    name: "title",
    placeholder: "Enter Title *",
    inputtype: "text",
    label: true,
    inputLabel: "Title ",
    width: "fullWidth",
    searchCustom: "BrandVideo",
  },
  // {
  //   type: "textarea",
  //   name: "description",
  //   inputLabel: "Description ",
  //   rows: 4,
  //   col: 10,
  //   exclass: "helpformHeight",
  //   label: true,
  //   customClass: "BrandVideo",
  // },
  {
    type: "input",
    name: "videolink",
    placeholder: "Paste the link for vimeo or youtube video ",
    inputtype: "text",
    label: true,
    inputLabel: "Upload Video Link *",
    headingText: "Brand Video",
    heading: true,
    searchCustom: "BrandVideo",
    brandGallery: true,
    brandGalleryText: "*Text to add suggested images and videos*",
    bottomLabel: "Youtube Or Vimeo",
  },
  {
    type: "upload",
    name: "videoThumb",
    placeholder: "Video Thumbnail *",
    label: true,
    inputLabel: "Listing Image* (567x346) max upload size 30MB ",
    exclass: "galleryInput",
    id: "thumb-image",
    searchCustom: "brandVideoLabel",
    thumb: true,
    single: true,
  },
];

const BrandVideoTab = (props: any) => {
  const [
    getVideoDetails,
    { data: videoDetails, error, isLoading: getLoading },
  ] = useLazyGetVideoDetailsQuery();
  const [updateBrandVideoDetails, { isLoading: updateLoading }] =
    useUpdateBrandVideoDetailsMutation();
  const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();

  const [thumbnailImage, setThumbnailImage] = useState<string[]>([]);

  const schema = yup.object({
    title: yup.string().required("This Field is required"),
    // description: yup.string().required("This Field is required"),
    videolink: yup.string().required("This Field is required"),
    videoThumb: yup
      .mixed()
      .test("required", "You need to provide a file", (file: any) => {
        if (file.length) return true;
        return false;
      })
      .test("fileType", "Upload only Image File Type", (value: any) => {
        if (!value) return true; // If no file is selected, allow it
        return Array.from(value)?.every((file: any) =>
          ["image/jpeg", "image/png", "url"].includes(file.type)
        );
      }),
  });

  const validateSchema: any = schema;

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateSchema), defaultValues: init });

  useEffect(() => {
    // let bid: any = sessionStorage.getItem("bid");
    let bid: any = sessionStorage.getItem("brandSlug");
    // console.log("BID", bid);

    if (bid) {
      getVideoDetails(bid);
    }
  }, []);

  useEffect(() => {
    if (!error && videoDetails) {
      if (videoDetails?.data?.attributes?.videoSection) {
        const { title, thumbnailUrl, videoLink } =
          videoDetails?.data?.attributes?.videoSection;

        if (thumbnailUrl) {
          let image: any = [
            { name: thumbnailUrl, url: thumbnailUrl, type: "url" },
          ];
          setValue("videoThumb", image);
          setThumbnailImage(image);
        }

        setValue("title", title);
        // setValue("description", desc);
        setValue("videolink", videoLink);
      }
    }
  }, [videoDetails]);

  const onSubmit = async (data: any) => {
    const { videoThumb } = data;
    try {
      let images = [];
      for (const file of videoThumb) {
        if (file?.type === "url") {
          images.push(file?.url);
        } else {
          const response = await uploadImage(file); // Call the upload mutation function for each file

          if (response) {
            images.push(response?.data[0]?.url);
          }
        }
      }

      let payload = {
        title: data?.title,
        // desc: data.description,
        // type: "MP4",
        videoLink: data.videolink,
        thumbnailUrl: images[0],
      };

      let bid: any = sessionStorage.getItem("bid");
      const response = await updateBrandVideoDetails({
        bid,
        videoData: payload,
      }).unwrap();
      getVideoDetails(bid);
      toast.success("video details uploaded successfully");
    } catch (error: any) {
      if (error?.data?.error?.message == "Your request is submitted!") {
        toast.success("Your information is pending administrative review.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  if (getLoading) return <SpinLoader size={"small"} />;

  return (
    <section className={style.brandVideoSection}>
      <div className={style.brandVideo}>
        <h6 className={style.dash_cardTitle}>Update Brands</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.formWrapper}>
            <div className="custom-row">
              <div className="col_12 col_xl_6">
                <div className="custom-row">
                  {fields.map((item: any, i: number) => (
                    <Fragment key={i}>
                      <FormGroup
                        getValues={getValues}
                        setValue={setValue}
                        images={thumbnailImage}
                        control={control}
                        errors={errors}
                        item={item}
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={style.buttonSubmit}>
            {!imageLoading && !updateLoading ? (
              <button type="submit" className={style.gradientButton}>
                <span className={style.btn}>Save</span>
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

export default BrandVideoTab;
