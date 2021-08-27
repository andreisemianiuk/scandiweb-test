import { setCategories, setCurrentCategory, setInitializedSuccess, setIsFetching } from './actionCreators'

export const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS'
export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'

export type AppActionTypes = ReturnType<typeof setInitializedSuccess
  | typeof setIsFetching
  | typeof setCategories
  | typeof setCurrentCategory>