import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: 'POST',
                body: newCategory,
            }),
        }),


        updateCategory: builder.mutation({
            query: ({ categoryId, updateCategory }) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'PUT',
                body: updateCategory
            }),
        }),

        deleteCategory: builder.mutation({
            query: ({ categoryId, deleteCategory }) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'DELETE',
                body: deleteCategory
            }),
        }),

        fetchCategories: builder.query({
            query: () => `${CATEGORY_URL}/categories`,

        })

    }),
})

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useFetchCategoriesQuery,
 
} = categoryApiSlice