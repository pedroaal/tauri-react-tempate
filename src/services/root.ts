import { createApi } from "@reduxjs/toolkit/query/react"

import { API_HOST } from "@/config/core"
import baseQuery from "@/utils/baseQuery"

export const Tags = {
  products: "products",
}

export const rootServices = createApi({
  reducerPath: "rootServices",
  baseQuery: baseQuery({
    baseUrl: API_HOST,
  }),
  endpoints: () => ({}),
  tagTypes: Object.values(Tags),
})
