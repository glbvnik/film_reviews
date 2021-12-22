import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../redux/store/index'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
