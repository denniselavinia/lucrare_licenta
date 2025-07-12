import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const profilesAPI = createApi({
	reducerPath: "profilesAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: `${getBaseUrl()}/api/profiles`,
		credentials: "include",
	}),
	tagTypes: ["Profile"],
	endpoints: (builder) => ({
		createProfile: builder.mutation({
			query: (newProfile) => ({
				url: "/",
				method: "POST",
				body: newProfile,
				// credentials: 'include',
			}),
			invalidatesTags: ["Profile"],
		}),
		getProfileByEmail: builder.query({
			query: (email) => ({
				url: `/email/${email}`,
			}),
			providesTags: ["Profile"],
		}),
		updateProfile: builder.mutation({
			// Accepts { email, ...updatedProfile }
			query: ({ email, ...updatedProfile }) => ({
				url: `/edit/${email}`,
				method: "PUT",
				body: updatedProfile,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Profile"],
		}),
	}),
});

export const {
	useCreateProfileMutation,
	useGetProfileByEmailQuery,
	useUpdateProfileMutation,
} = profilesAPI;
export default profilesAPI;
