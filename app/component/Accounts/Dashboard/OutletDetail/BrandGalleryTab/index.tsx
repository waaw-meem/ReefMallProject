import { yupResolver } from "@hookform/resolvers/yup";
import style from "../index.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Fragment, useEffect, useState } from "react";
import FormGroup from "@/app/component/Form/FormGroup";
import {
  useLazyGetBrandGalleryDetailsQuery,
  useUpdateBrandGalleryMutation,
} from "@/redux/reducers/OutletApiSlice/OutletApiSlice";
import { useUploadImageMutation } from "@/redux/reducers/UploadSlice/UploadApiSlice";
import { toast } from "react-toastify";
import SpinLoader from "@/app/component/Loader/SpinLoader";

const init = {
  title: "",
  gallery: [],
};

const fields = [
  {
    type: "input",
    name: "title",
    placeholder: "",
    inputtype: "text",
    label: true,
    inputLabel: "Title*",
    exclass: "galleryInputWrapper",
  },
  {
    type: "upload",
    name: "gallery",
    placeholder: "Upload Images",
    label: true,
    inputLabel: "Image* (795x658) - max upload size 30MB",
    inputBottom: "Support Jpeg, PNG, JPG",
    brandGallery: true,
    brandGalleryText: "*Text to add suggested images and videos*",
    exclass: "galleryInput",
    id: "brand-gallery",
    width: "fullWidth",
    thumb: true,
  },
];

const BrandGalleryTab = () => {
  const [
    getBrandGalleryDetails,
    { data: galleryDetails, error, isLoading: getLoading },
  ] = useLazyGetBrandGalleryDetailsQuery();
  const [images, setImages] = useState([]);
  const [getBrandGalleryDetails1, setGetBrandGalleryDetails] = useState();
  const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();
  const [updateBrandGallery, { isLoading }] = useUpdateBrandGalleryMutation();
  const [loading, setLoading] = useState(false);
  const schema = yup.object({
    title: yup.string().required("This Field is required"),
    gallery: yup
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
  });

  const validateSchema: any = schema;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validateSchema), defaultValues: init });

  useEffect(() => {
    // let bid: any = sessionStorage.getItem("bid");
    let bid: any = sessionStorage.getItem("brandSlug");
    if (bid) {
      getBrandGalleryDetails(bid).then((item: any) => {
        setGetBrandGalleryDetails(item);
      });
    }
  }, []);

  useEffect(() => {
    if (!error && galleryDetails) {
      let images;
      if (galleryDetails?.data?.attributes?.brandGalleryDetails) {
        const { title, brandImages } =
          galleryDetails?.data?.attributes?.brandGalleryDetails;

        if (brandImages && brandImages?.length > 0) {
          images = brandImages.map((image: string) => ({
            name: image,
            url: image,
            type: "url",
          }));
        }
        setValue("title", title);
        // setValue("gallery", images);
        setImages(images);
      }
    }
  }, [galleryDetails, getLoading]);

  const onSubmit = async (data: any) => {
    const { title, gallery } = data;
    setLoading(true);
    try {
      const images = [];
      for (const file of gallery) {
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
        title: title,
        brandImages: images,
      };
      let bid: any = sessionStorage.getItem("bid");
      let slug: any = sessionStorage.getItem("brandSlug");
      const response = await updateBrandGallery({
        bid,
        galleryData: payload,
      }).unwrap();
      getBrandGalleryDetails(slug);
      toast.success("Gallery uploaded successfully");
    } catch (error: any) {
      if (error?.data?.error?.message == "Your request is submitted!") {
        toast.success("Your information is pending administrative review.");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };
  if (getLoading) return <SpinLoader size={"small"} />;
  return (
    <section className={style.brandGallerySection}>
      <div className={style.brandGallery}>
        <h6 className={style.dash_cardTitle}>Brand Gallery</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.formWrapper}>
            {fields.map((item: any, i: number) => (
              <Fragment key={i}>
                <FormGroup
                  getValues={getValues}
                  setValue={setValue}
                  images={images}
                  control={control}
                  errors={errors}
                  item={item}
                />
              </Fragment>
            ))}
          </div>
          <div className={style.buttonSubmit}>
            {!loading ? (
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

export default BrandGalleryTab;
