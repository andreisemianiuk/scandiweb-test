import {
  setCategories,
  setCurrentCategory,
  setCurrentPrice, setCurrentProductID,
  setInitializedSuccess,
  setIsFetching, setIsOpenCurrencies,
} from './actionCreators'

export const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS'
export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'
export const SET_CURRENT_PRICE = 'SET_CURRENT_PRICE'
export const SET_IS_OPEN_CURRENCIES = 'SET_IS_OPEN_CURRENCIES'
export const SET_CURRENT_PRODUCT_ID = 'SET_CURRENT_PRODUCT_ID'

export type AppActionTypes = ReturnType<typeof setInitializedSuccess
  | typeof setIsFetching
  | typeof setCategories
  | typeof setCurrentCategory
  | typeof setCurrentPrice
  | typeof setIsOpenCurrencies
  | typeof setCurrentProductID>