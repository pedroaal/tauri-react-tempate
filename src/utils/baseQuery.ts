import type { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query"

import {
  addAlertItem,
  type IAlert,
  removeAlertItem,
} from "@/slices/alertsSlice"
import { handleLoader } from "./handleLoader"
import type { IRootState } from "@/utils/store"
import { AUTO_DISMISS_AFTER_MS } from "@/constants/core"
import { handleErrors, type IResponseAction } from "./handleErrors"

interface IBaseQuery {
  baseUrl: string
}

export interface IBaseQueryArgs {
  url: (state: IRootState) => string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  body?: any
  extraErrorAction?: IResponseAction
  hideError?: boolean
  referenceErrorsKeys?: { [name: string]: string }
  hideLoader?: boolean
  extraSuccessActions?: IResponseAction[]
  successMessage?: IAlert
  errorMessage?: IAlert
  extraHeaders?: { [name: string]: string | number }
}

const baseQuery =
  (baseArgs: IBaseQuery): BaseQueryFn<IBaseQueryArgs, unknown, unknown> =>
  async (args: IBaseQueryArgs, api: BaseQueryApi) => {
    const { baseUrl } = baseArgs
    const {
      url,
      method,
      body,
      extraErrorAction,
      hideError,
      hideLoader = false,
      extraSuccessActions,
      successMessage,
      errorMessage,
      extraHeaders,
    } = args

    const state = api.getState() as IRootState
    const urlPath = url(state)
    const requestReference = `${new Date().getTime()}/${urlPath}-${method}`

    const headers: {} = {}

    if (extraHeaders) {
      Object.assign(headers, extraHeaders)
    }

    try {
      handleLoader(requestReference, false, hideLoader, api.dispatch)

      const result = await fetch(`${baseUrl}/${urlPath}`, {
        method,
        body,
        headers,
      })

      const data = await result.json()

      handleLoader(requestReference, true, hideLoader, api.dispatch)

      if (extraSuccessActions) {
        extraSuccessActions.map((action) => {
          api.dispatch(action(data))
        })
      }

      if (successMessage) {
        api.dispatch(addAlertItem(successMessage))
        setTimeout(() => {
          api.dispatch(removeAlertItem(successMessage))
        }, AUTO_DISMISS_AFTER_MS)
      }

      return data
    } catch (error) {
      handleLoader(requestReference, true, hideLoader, api.dispatch)

      if (error) {
        handleErrors(
          error,
          extraErrorAction,
          body,
          !!hideError,
          api.dispatch,
          errorMessage,
        )
      }

      return {
        error: { status: error.response?.status, data: error.response?.data },
      }
    }
  }

export default baseQuery
