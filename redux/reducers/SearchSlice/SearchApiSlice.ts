import { apiSlice } from "@/redux/api/ApiSlice";

export const ServiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    searchByUser: builder.mutation({
      query: (data: any) => ({
        url: "/saved-searches",
        method: "POST",
        body: data,
      }),
    }),
    getSaveSearchByUser: builder.query({
      query: (id: any) => ({
        url: `/saved-searches?filters[user][id]=${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        const sortedArray = response?.data?.sort((a: any, b: any) => {
          // Convert the EventDate strings to Date objects for comparison
          const dateA: any = new Date(a.attributes.updatedAt);
          const dateB: any = new Date(b.attributes.updatedAt);

          return dateB - dateA; // Sorting in descending order
        });
        response.data = sortedArray;

        return response;
      },
    }),
    // getSearchPage: builder.query({
    //   query: (data: any) => ({
    //     url: "/search-page?populate=deep",
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  useSearchByUserMutation,
  useGetSaveSearchByUserQuery,
  // useGetSearchPageQuery,
} = ServiceApiSlice;
