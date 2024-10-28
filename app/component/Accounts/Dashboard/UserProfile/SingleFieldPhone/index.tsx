"use client";
import React, { useEffect, useState } from "react";
import style from "../SingleFieldEmail/index.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "@/app/component/Form/FormElement/InputField";
import { useSession } from "next-auth/react";
import { useUpdateUserProfileMutation } from "@/redux/reducers/UserSlice/UserApiSlice";
import { toast } from "react-toastify";

const SingleFieldPhone = (props: any) => {
  const { init, refetch } = props;
  const { data: session } = useSession<any>();
  const [updateUserProfile, { isLoading: updateLoad }] =
    useUpdateUserProfileMutation();
  const [edit, setEdit] = useState(false);

  const schema = yup.object({
    phone: yup.string().required("This field is required"),
  });
  const validateSchema: any = schema;
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: { phone: "" },
  });

  useEffect(() => {
    if (init) {
      setValue("phone", init.phoneNumber);
    }
  }, [init, setValue]);

  const onSubmit = async (val: any) => {
    try {
      let data = {
        id: session?.user?.id,
        phoneNumber: val.phone,
      };

      const update = await updateUserProfile(data).unwrap();
      toast.success("Success");
      setEdit(false);
      refetch();
    } catch (error) {
      setEdit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`form-group ${style.inputFormWrapper} ${style.phoneAndPasswordField}`}
      >
        <label className={style.label}>Phone</label>
        <div className={`${style.input} ${edit ? style.editinput : ""}`}>
          <InputField
            name={"phone"}
            control={control}
            placeholder={"-"}
            type={"text"}
            class={style.input}
            req={true}
            readOnly={!edit}
          />
          {errors["phone"] && (
            <span className="error">{errors["phone"]?.message}</span>
          )}
        </div>
        <button
          type={"submit"}
          className={`${style.button} ${!edit ? style.visible : ""}`}
        >
          Update
        </button>
        {/* <button
          type={"button"}
          onClick={() => setEdit(true)}
          className={`${style.button} ${edit ? style.visible : ""}`}
        >
          Edit
        </button> */}
      </div>
    </form>
  );
};

export default SingleFieldPhone;
