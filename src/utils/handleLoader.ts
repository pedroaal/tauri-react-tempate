import type { Dispatch } from "@reduxjs/toolkit"

import { addLoader, removeLoader } from "~/slices/loaderSlice"

export const handleLoader = (
  ref: string,
  isRemove: boolean,
  hideLoader: boolean,
  dispatch: Dispatch,
) => {
  if (hideLoader) {
    return null
  }

  if (isRemove) {
    dispatch(removeLoader(ref))
  } else {
    dispatch(addLoader(ref))
  }
}
