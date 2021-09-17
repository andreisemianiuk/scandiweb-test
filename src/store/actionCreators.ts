import * as actionTypes from './actionTypes'
import { AppActionTypes } from './actionTypes'
import { Dispatch } from 'react'
import { fetchGraphQL } from '../api/api'
import { Query } from '@tilework/opus'

export const setIsFetching = (isFetching: boolean) => {
  return {
    type: actionTypes.SET_IS_FETCHING,
    isFetching,
  } as const
}

export const setCategories = (categories: ICategory[]) => {
  return {
    type: actionTypes.SET_CATEGORIES,
    categories,
  } as const
}

export const setCurrentCategory = (current: number) => {
  return {
    type: actionTypes.SET_CURRENT_CATEGORY,
    current,
  } as const
}

export const setCurrentPrice = (price: string) => {
  return {
    type: actionTypes.SET_CURRENT_PRICE,
    price,
  } as const
}

export const setCurrentProductID = (id: string) => {
  return {
    type: actionTypes.SET_CURRENT_PRODUCT_ID,
    id,
  } as const
}

export const setIsOpenCurrencies = (isOpen: boolean) => {
  return {
    type: actionTypes.SET_IS_OPEN_CURRENCIES,
    isOpen,
  } as const
}

export const setAttribute = (attribute: IAttributeSet ) => {
  return {
    type: actionTypes.SET_ATTRIBUTE,
    attribute,
  } as const
}

export const clearAttributes = ()  => {
  return {
    type: actionTypes.CLEAR_ATTRIBUTES,
  } as const
}

export const addProductInCart = (product: IProductInCart)  => {
  return {
    type: actionTypes.ADD_PRODUCT_IN_CART,
    product
  } as const
}

export const removeProductFromCart = (productId: number)  => {
  return {
    type: actionTypes.REMOVE_PRODUCT_FROM_CART,
    productId
  } as const
}

export const clearProductCart = ()  => {
  return {
    type: actionTypes.CLEAR_PRODUCT_CART,
  } as const
}

export const increaseProductCount = (i: number)  => {
  return {
    type: actionTypes.INC_PRODUCT_COUNT,
    i
  } as const
}

export const decreaseProductCount = (i: number)  => {
  return {
    type: actionTypes.DEC_PRODUCT_COUNT,
    i
  } as const
}

export const setTotalSum = ()  => {
  return {
    type: actionTypes.SET_TOTAL_SUM,
  } as const
}

// Thunk Creators

export const getCategoriesTC = () => (dispatch: Dispatch<AppActionTypes>) => {
  dispatch(setIsFetching(true))
  const data = fetchGraphQL(new Query(`categories {
    name
    products {
      id
      name
      inStock
      category
      brand
      gallery
      description
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency
        amount
      }
    }
  }`, true))
  
  data.then(res => {
    dispatch(setCategories(res.categories))
    dispatch(setIsFetching(false))
  })
}