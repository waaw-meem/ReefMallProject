"use client";

import Image from "next/image";
import React, { useEffect, useState, memo } from "react";
import style from "./index.module.scss";
import SvgComp from "@/app/component/SvgComp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "@/app/component/Form/FormElement/InputField";
import { useUploadImageMutation } from "@/redux/reducers/UploadSlice/UploadApiSlice";
import { useUpdateUserProfileMutation } from "@/redux/reducers/UserSlice/UserApiSlice";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import editIcon from "../../../../../../public/assets/svg/dashboard/edit.svg";
import PageLoader from "@/app/component/PageLoader";

const ImageAndName = (props: any) => {
  const { init, refetch } = props;
  const { data: session } = useSession<any>();
  const [updateUserProfile, { isLoading: updateLoad }] =
    useUpdateUserProfileMutation();
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [editTitle, setEditTitle] = useState(false);
  const [data, setData] = useState({
    title: "",
    image: "",
  });

  const [userImage, setUserImage] = useState(
    "/assets/images/dashboard/placeholder.jpg"
  );

  const schema = yup.object({
    title: yup.string().required("This field is required"),
  });
  const validateSchema: any = schema;
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: data,
  });

  useEffect(() => {
    if (init) {
      setValue("title", init.username);
      setValue("image", init.profileImg || "");
      setData({
        title: init.username || "",
        image: init.profileImg || "",
      });
    }
  }, [init]);
  const handleDeleteImage = async (val: any) => {
    setValue("image", "");
    setData({
      ...data,
      image: "",
    });

    try {
      let data = {
        id: session?.user?.id,
        profileImg: null,
        fullName: val.title,
      };

      const update = await updateUserProfile(data).unwrap();
      toast.success("Image deleted successfully!");
      setUserImage("/assets/images/dashboard/placeholder.jpg");
      refetch();
    } catch (error) {
      toast.error("Error");
    }
  };

  const onSubmit = async (val: any) => {
    try {
      let data = {
        id: session?.user?.id,
        // profileImg: val.image,
        profileImg: getValues("image"),
        // username: val.title,
        fullName: getValues("title"),
      };

      const update = await updateUserProfile(data).unwrap();
      toast.success("Success");
      setEditTitle(false);
      refetch();
    } catch (error) {
      setEditTitle(false);
      toast.error("Error");
    }
  };

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return; // User canceled file selection
    }

    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    // console.log(
    //   allowedFileTypes?.includes(event.target.files?.[0]?.type),
    //   "event.target.files"
    // );
    // if (
    //   event.target.files?.[0]?.name.split(".")[1] == "mp4" ||
    //   event.target.files?.[0]?.name.split(".")[1] == "pdf" ||
    //   event.target.files?.[0]?.name.split(".")[1] == "csv" ||
    //   event.target.files?.[0]?.name.split(".")[1] == "docx"
    // ) {
    //   return toast.error("Only PNG, JPG, and JPEG files are allowed.");
    // }
    if (!allowedFileTypes?.includes(event.target.files?.[0]?.type)) {
      return toast.error("Only PNG, JPG, and JPEG files are allowed.");
    }
    const file = event.target.files[0];
    // setEditTitle(true);
    try {
      const upload = await uploadImage(file).unwrap();
      if (upload) {
        const url = upload[0]?.url;
        setValue("image", url);
        let data = {
          id: session?.user?.id,
          // profileImg: val.image,
          profileImg: getValues("image"),
          // username: val.title,
          fullName: getValues("title"),
        };
        const update = await updateUserProfile(data).unwrap();
        toast.success("Success");
      }
    } catch (error) {
      console.log("Error uploading image", error);
    }

    setUserImage(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <>
      {(updateLoad || isLoading) && <PageLoader />}
      <div className={style.userDetailWrapper}>
        <div className={style.profileImageWrapper}>
          <div className={`form-group ${style.imageWrapper}`}>
            {getValues("image") ? (
              <Image
                alt=""
                src={getValues("image") || userImage}
                width={151}
                height={151}
              />
            ) : (
              <Image alt="" src={userImage} width={151} height={151} />
            )}
            <div className={style.buttonWrapper}>
              <label htmlFor="profile-img">Change</label>
              <input
                onChange={handleFileUpload}
                id="profile-img"
                type="file"
                name="photo"
                style={{ display: "none" }}
                accept="image/png, image/svg, image/jpeg, image/webp"
              ></input>
              {/* <button onClick={() => console.log("delete")}>Delete</button> */}
              <button onClick={handleDeleteImage}>Delete</button>
            </div>
          </div>
          <div className={`${style.inputWrapper}`}>
            <form
              className={style.formWrapper}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                className={`${style.input} ${editTitle ? style.editinput : ""}`}
              >
                <InputField
                  name={"title"}
                  control={control}
                  placeholder={"Enter Name"}
                  type={"text"}
                  class={style.input}
                  req={true}
                  readOnly={!editTitle}
                />
                {errors["title"] && (
                  <span className={style.error}>
                    {errors["title"]?.message}
                  </span>
                )}
              </div>
              <button
                type={"submit"}
                className={`${style.button} ${!editTitle ? style.visible : ""}`}
                // onClick={onSubmit}
              >
                Update
              </button>
            </form>
            <button
              type="button"
              onClick={() => setEditTitle(true)}
              className={`${style.editButton} ${
                editTitle ? style.visible : ""
              }`}
            >
              <SvgComp src={editIcon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageAndName;
