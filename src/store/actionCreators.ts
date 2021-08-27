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

// Thunk Creators

// export const getInitData = (): RootThunkType => () => {
//
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
    '    }\n' +
    '  }', true))
  console.log(data)
  data.then(res =>
    dispatch(setCategories(res.categories)))
}