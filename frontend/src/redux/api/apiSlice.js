import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'
const baseQuery = fetchBaseQuery({baseurl:BASE_URL})

export const apiSlice = createApi({
    baseQuery,  
    tagTypes:['product','Order','User','Category'],
    endpoints:()=>({})
})
