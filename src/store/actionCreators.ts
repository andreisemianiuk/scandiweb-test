import * as actionTypes from './actionTypes'
import { AppActionTypes } from './actionTypes'
import { Dispatch } from 'react'
import { fetchGraphQL } from '../api/api'
import { Query } from '@tilework/opus'

export const setInitializedSuccess = () => {
  return {
    type: actionTypes.SET_INITIALIZED_SUCCESS,
  } as const
}

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

// Thunk Creators

// export const getCurrID = (id:string) => (dispatch: Dispatch<AppActionTypes>) => {debugger
//   dispatch(setCurrentProductID(id))
// }

export const getCategoriesTC = () => (dispatch: Dispatch<AppActionTypes>) => {
  const data = fetchGraphQL(new Query('categories {\n' +
    '    name\n' +
    '    products {\n' +
    '      id\n' +
    '      name\n' +
    '      inStock\n' +
    '      category\n' +
    '      brand\n' +
    '      gallery\n' +
    '      description\n' +
    '      attributes {\n' +
    '        id\n' +
    '        name\n' +
    '        type\n' +
    '        items {\n' +
    '          id\n' +
    '          displayValue\n' +
    '          value\n' +
    '        }\n' +
    '      }\n' +
    '      prices {\n' +
    '        currency\n' +
    '        amount\n' +
    '      }\n' +
    '    }\n' +
    '  }', true))
  
  data.then(res => dispatch(setCategories(res.categories)))
}