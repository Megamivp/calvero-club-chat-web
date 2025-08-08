import {
  useDispatch as dispatch,
  useSelector as selector,
  useStore as store,
} from "react-redux";

import type { AppDispatch, RootState, AppStore } from "@/lib/store";

export const useDispatch = dispatch.withTypes<AppDispatch>();
export const useSelector = selector.withTypes<RootState>();
export const useStore = store.withTypes<AppStore>();
