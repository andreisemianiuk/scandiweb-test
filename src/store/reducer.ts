import * as actionTypes from './actionTypes'
import { AppActionTypes } from './actionTypes'

const initialState: AppStateType = {
  initialized: false,
  isFetching: false,
  categories: [],
  currentCategory: 0
}

export const appReducer = (state: AppStateType = initialState, action: AppActionTypes): AppStateType => {
  switch (action.type) {
    case actionTypes.SET_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
        
      }
    case actionTypes.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
        
      }
    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      }
      case actionTypes.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.current,
      }
    default:
      return state
  }
}
