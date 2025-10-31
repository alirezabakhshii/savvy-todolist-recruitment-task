import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/store";

export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
