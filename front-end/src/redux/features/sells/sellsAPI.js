import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const sellsAPI = createApi({
	rordersAPIeducerPath: "sellsAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: `${getBaseUrl()}/api/sells`,
		credentials: "include",
	}),
	tagTypes: ["Sells"],
	endpoints: (builder) => ({
		createASell: builder.mutation({
			query: (newSell) => ({
				url: "/",
				method: "POST",
				body: newSell,
				credentials: "include",
			}),
		}),
		getSellByEmail: builder.query({
			query: (email) => ({
				url: `/email/${email}`,
			}),
			providesTags: ["Sells"],
		}),
	}),
});

export const { useCreateASellMutation, useGetSellByEmailQuery } = sellsAPI;
export default sellsAPI;
