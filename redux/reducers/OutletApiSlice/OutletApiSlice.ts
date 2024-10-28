import { getSession } from "next-auth/react";
import { apiSlice } from "../../api/ApiSlice";

export const OutletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllSubCategoriesByCategoryID: builder.query({
      query: (category: string) => `brand-categories?filters[type]=${category}`,
    }),
    conectBrandByVendor: builder.mutation({
      query: (payload: any) => {
        return {
          url: `/users/${payload.user.id}`,
          method: "PUT",
          body: {
            brand: {
              connect: [{ ...payload.connectData }],
            },
          },
        };
      },
    }),
    getBrandInfoDetailsByUserId: builder.query({
      query: (user: any) => `users/${user?.id}?populate=brand`,
    }),
    // DONE
    getBrandInfoDetails: builder.query({
      query: (bid: any) => `/brands/${bid}?populate[1]=brand_categories`,
    }),
    postBrandInfo: builder.mutation({
      query: (payload: any) => {
        let connect: any = [];
        payload?.sId.forEach((element: any) => {
          const obj = {
            id: element,
          };
          connect.push(obj);
        });

        return {
          url: `/brands`,
          method: "POST",
          body: {
            data: {
              ...payload?.payload,
              users_permissions_user: {
                connect: [
                  {
                    id: payload?.userId,
                  },
                ],
              },
              brand_categories: {
                set: connect,
              },
            },
          },
        };
      },
    }),
    updateBrandInfo: builder.mutation({
      query: (payload: any) => {
        let connect: any = [];
        payload?.sId.forEach((element: any) => {
          const obj = {
            id: element,
          };
          connect.push(obj);
        });
        return {
          url: `/brands/${payload.bid}`,
          method: "PUT",
          body: {
            data: {
              ...payload?.payload,
              brand_categories: {
                set: connect,
              },
            },
          },
        };
      },
    }),
    // DONE
    getBrandContactDetails: builder.query({
      query: (bid: any) => `/brands/${bid}`,
    }),
    updateBrandContactInfo: builder.mutation({
      query: (payload: any) => {
        const { bid, contactInfo } = payload;
        return {
          url: `/brands/${bid}`,
          method: "PUT",
          body: {
            data: {
              ...contactInfo,
            },
          },
        };
      },
    }),
    // DONE
    getBrandGalleryDetails: builder.query({
      query: (bid: any) =>
        `/brands/${bid}?populate[3]=brandGalleryDetails.brandImages`,
    }),
    updateBrandGallery: builder.mutation({
      query: (payload: any) => {
        const { bid, galleryData } = payload;
        return {
          url: `/brands/${bid}`,
          method: "PUT",
          body: {
            data: {
              brandGalleryDetails: { ...galleryData },
            },
          },
        };
      },
    }),
    getVideoDetails: builder.query({
      query: (bid: any) =>
        `/brands/${bid}?populate[4]=videoSection.thumbnailUrl`,
    }),
    updateBrandVideoDetails: builder.mutation({
      query: (payload: any) => {
        const { bid, videoData } = payload;
        return {
          url: `/brands/${bid}`,
          method: "PUT",
          body: {
            data: {
              videoSection: { ...videoData },
            },
          },
        };
      },
    }),
    getOfferById: builder.query({
      query: (oid: any) => `brand-offers/${oid}?populate=*`,
    }),
    createOffer: builder.mutation({
      query: (payload: any) => {
        return {
          url: `/brand-offers`,
          method: "POST",
          body: {
            data: {
              ...payload,
            },
          },
        };
      },
    }),
    updateOfferById: builder.mutation({
      query: (payload: any) => {
        return {
          url: `/brand-offers/${payload.oid}`,
          method: "PUT",
          body: {
            data: {
              ...payload.data,
            },
          },
        };
      },
    }),
    getOfferByBrandId: builder.query({
      query: (bid: any) =>
        `/brand-offers?populate[0]=brand&filters[brand][id]=${bid}`,
    }),
    removeOfferById: builder.mutation({
      query: (oid: any) => {
        return {
          url: `/brand-offers/${oid}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useLazyGetAllSubCategoriesByCategoryIDQuery,
  useLazyGetBrandInfoDetailsByUserIdQuery,
  usePostBrandInfoMutation,
  useUpdateBrandInfoMutation,
  useLazyGetBrandInfoDetailsQuery,
  useUpdateBrandContactInfoMutation,
  useLazyGetBrandContactDetailsQuery,
  useUpdateBrandGalleryMutation,
  useLazyGetBrandGalleryDetailsQuery,
  useUpdateBrandVideoDetailsMutation,
  useLazyGetVideoDetailsQuery,
  useConectBrandByVendorMutation,
  useCreateOfferMutation,
  useLazyGetOfferByBrandIdQuery,
  useRemoveOfferByIdMutation,
  useLazyGetOfferByIdQuery,
  useUpdateOfferByIdMutation,
} = OutletApiSlice;
