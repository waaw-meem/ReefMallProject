import { getSession } from "next-auth/react";
import { apiSlice } from "../../api/ApiSlice";
import moment from "moment";

export const OutletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllFavs: builder.query({
      query: (user: any) =>
        `users/${user?.id}?populate[1]=favourite_brands.logoUrl&populate[2]=favourite_brands.brand_categories`,
    }),
    removeFav: builder.mutation({
      query: (payload: any) => {
        let { user, bid } = payload;
        return {
          url: `/users/${user.id}`,
          method: "PUT",
          body: {
            favourite_brands: {
              disconnect: [
                //to add use connect to remove use disconnect
                { id: bid },
              ],
            },
          },
        };
      },
    }),
    getAllEvents: builder.query({
      query: () => `events?populate=deep&filters[date][$gte]=${moment().format('yyyy-MM-DD')}`,
    }),
  }),
});

export const {
  useLazyGetAllFavsQuery,
  useRemoveFavMutation,
  useGetAllEventsQuery,
} = OutletApiSlice;
