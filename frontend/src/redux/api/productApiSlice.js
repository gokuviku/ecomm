import { PRODUCT_URL } from '../constants'
import { apiSlice } from './apiSlice'


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword }) => ({
                url: `${PRODUCT_URL}`,
                params: { keyword },
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"],
        }),

        getProductById: builder.query({
            query: (productid) => `${PRODUCT_URL}/${productid}`,
            providesTags: (result, error, productId) => [
                { type: "Product", id: productId }
            ],
        }),

        allProducts: builder.query({
            query: () => `${PRODUCT_URL}/allproducts`,
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),

        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}`,
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ["Product"],
        }),

       updateProduct: builder.mutation({
            query: (productId , formData) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: 'PUT',
               body: formData,
            }),
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: 'DELETE',
            }),
            providesTags: ["Product"],
        }),

        createReview:builder.mutation({
            query:(data)=>({
                url: `${PRODUCT_URL}/${data.productId}/reviews`,
                method:'POST',
                body:data,
            }),
        }),

        getTopProduct:builder.query({
            query: () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor:5,
        }),

        getNewProduct: builder.query({
            query: () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor: 5,
        }),

        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`{UPLOAD_URL}`,
                method:"POST",
                body:data,
            }),
        }),

        getFilteredProducts:builder.query({
            query: ({checked,radio})=>({
                url: `${PRODUCT_URL}/filtered-products`,
                method:"POST",
                body:{checked,radio},
            })
        })


    }),
})


export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAllProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetNewProductQuery,
    useGetTopProductQuery,
    useCreateReviewMutation,
    useUploadProductImageMutation,
    useGetFilteredProductsQuery,
} = productApiSlice