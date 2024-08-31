import type { Dispatch, PayloadAction } from "@reduxjs/toolkit"

import {
  API_ERRORS,
  AUTO_DISMISS_AFTER_MS,
  HTTP_RESPONSE_CODE,
} from "~/constants/core"
import { addAlert, type IAlert, removeAlert } from "~/slices/alertsSlice"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IResponseAction = (response: any) => PayloadAction<any>

const dispatchErrorMessage = (
  errorStatus: number | undefined,
  isRemove: boolean,
  dispatch: Dispatch,
  apiErrorMessage: string,
  errorMessage: IAlert | undefined,
) => {
  const errorAction = isRemove ? removeAlert : addAlert
  if (
    errorMessage &&
    errorStatus &&
    errorStatus !== HTTP_RESPONSE_CODE.error500
  ) {
    return dispatch(errorAction(errorMessage))
  }

  if (apiErrorMessage) {
    return dispatch(
      errorAction({
        type: "WARNING",
        value: apiErrorMessage,
      }),
    )
  }

  switch (errorStatus) {
    case HTTP_RESPONSE_CODE.error404:
      return dispatch(
        errorAction({
          title: API_ERRORS.error404,
          type: "WARNING",
          value: "",
        }),
      )
    case HTTP_RESPONSE_CODE.error401:
    case HTTP_RESPONSE_CODE.error403:
      return dispatch(
        errorAction({
          title: API_ERRORS.error401,
          type: "WARNING",
          value: "",
        }),
      )
    case HTTP_RESPONSE_CODE.error500:
      return dispatch(
        errorAction({
          title: API_ERRORS.error500,
          type: "DANGER",
          value: "",
        }),
      )
    default:
      return dispatch(
        errorAction({
          title: "Api Error",
          type: "DANGER",
          value: "",
        }),
      )
  }
}

export const handleErrors = (
  errors: any,
  extraErrorsAction: IResponseAction | undefined,
  body: any,
  hideError: boolean,
  dispatch: Dispatch,
  errorMessage: IAlert | undefined,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiData = errors.response?.data as any
  const apiErrorMessage = apiData.message

  if (extraErrorsAction) {
    dispatch(extraErrorsAction(errors.response?.data))
  }

  if (hideError) {
    return null
  }

  dispatchErrorMessage(
    errors?.response?.status,
    false,
    dispatch,
    apiErrorMessage,
    errorMessage,
  )

  setTimeout(() => {
    dispatchErrorMessage(
      errors?.response?.status,
      true,
      dispatch,
      apiErrorMessage,
      errorMessage,
    )
  }, AUTO_DISMISS_AFTER_MS)
}
