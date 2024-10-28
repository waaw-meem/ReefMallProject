import { apiSlice } from "../../api/ApiSlice";

const dataForm = ({ file }: { file: any }) => {
    const formData = new FormData();
    formData.append("files", file);
    return formData
}


export const UploadApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder: any) => ({
        uploadImage: builder.mutation({
            query: (file: any) => {
                return {
                    url: `/upload`,
                    method: "POST",
                    body: dataForm({
                        file: file
                    })
                }
            },
        }),
    }),
});

export const {
    useUploadImageMutation
} = UploadApiSlice;
