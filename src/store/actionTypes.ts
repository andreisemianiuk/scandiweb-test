import {
  addProductInCart,
  clearAttributes,
  clearProductCart,
  decreaseProductCount,
  increaseProductCount,
  removeProductFromCart,
  setAttribute,
  setCategories,
  setCurrentCategory,
  setCurrentPrice,
  setCurrentProductID,
  setIsFetching,
  setIsOpenCurrencies,
  setTotalSum,
} from './actionCreators'

export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'
export const SET_CURRENT_PRICE = 'SET_CURRENT_PRICE'
export const SET_IS_OPEN_CURRENCIES = 'SET_IS_OPEN_CURRENCIES'
export const SET_ATTRIBUTE = 'SET_ATTRIBUTE'
export const CLEAR_ATTRIBUTES = 'CLEAR_ATTRIBUTES'
export const SET_CURRENT_PRODUCT_ID = 'SET_CURRENT_PRODUCT_ID'
export const ADD_PRODUCT_IN_CART = 'ADD_PRODUCT_IN_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const CLEAR_PRODUCT_CART = 'CLEAR_PRODUCT_CART'
export const INC_PRODUCT_COUNT = 'INC_PRODUCT_IN_CART'
export const DEC_PRODUCT_COUNT = 'DEC_PRODUCT_COUNT'
export const SET_TOTAL_SUM = 'SET_TOTAL_SUM'

export type AppActionTypes = ReturnType<typeof setIsFetching
  | typeof setCategories
  | typeof setCurrentCategory
  | typeof setCurrentPrice
  | typeof setIsOpenCurrencies
  | typeof setAttribute
  | typeof clearAttributes
  | typeof addProductInCart
  | typeof removeProductFromCart
  | typeof clearProductCart
  | typeof increaseProductCount
  | typeof decreaseProductCount
  | typeof setTotalSum
  | typeof setCurrentProductID>