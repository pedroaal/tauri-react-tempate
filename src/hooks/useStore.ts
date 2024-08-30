import type { ThunkDispatch } from "@reduxjs/toolkit"
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux"

import type { IRootState, IAppDispatch } from "@/utils/store"

export const useAppDispatch: () => IAppDispatch = useDispatch
export const useThunkDispatch: () => ThunkDispatch<any, any, any> = useDispatch
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
