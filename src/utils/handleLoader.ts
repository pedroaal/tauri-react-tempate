import type { Dispatch } from "@reduxjs/toolkit"

import { addLoaderItem, removeLoaderItem } from "@/slices/loaderSlice"

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
    dispatch(removeLoaderItem(ref))
  } else {
    dispatch(addLoaderItem(ref))
  }
}
