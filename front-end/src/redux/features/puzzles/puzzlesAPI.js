import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/puzzles`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const puzzlesAPI = createApi({
    reducerPath: 'puzzlesAPI',
    baseQuery,
    tagTypes: ['Puzzles'],
    endpoints: (builder) => ({
        fetchPuzzles: builder.query({
            query: () => '/',
            providesTags: ['Puzzles']
        }),
        fetchPuzzleById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) =>  [{ type: 'Puzzles', id }],
        }),
        addPuzzle: builder.mutation({
            query: (newPuzzle) => ({
                url: '/create-puzzle',
                method: 'POST',
                body: newPuzzle,
            }),
            invalidatesTags: ['Puzzles'],
        }),
        updatePuzzle: builder.mutation({    
            query: ({ id, ...updatedPuzzle }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: updatedPuzzle,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Puzzles'],
        }),
        deletePuzzle: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Puzzles'],
        }),
    }),
})

export const { useFetchPuzzlesQuery, useFetchPuzzleByIdQuery,
    useAddPuzzleMutation, useUpdatePuzzleMutation, useDeletePuzzleMutation } = puzzlesAPI;
export default puzzlesAPI;