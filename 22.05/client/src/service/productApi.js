import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `products`,
    }),
    getOneProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    postProduct:builder.mutation({
        query:(newProduct)=>({
            url:`/products`,
            method:'POST',
            body:newProduct,
            headers:{
                "Content-type":"application/json"
            }
        })
    }),
    deleteProduct:builder.mutation({
      query:(id)=>({
       url:`products/${id}`,
       method:'DELETE'
      })
    })
  }),
})

export const { useGetProductQuery,usePostProductMutation ,useDeleteProductMutation,useGetOneProductQuery} = productApi