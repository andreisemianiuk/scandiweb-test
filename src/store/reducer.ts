import * as actionTypes from './actionTypes'
import { AppActionTypes } from './actionTypes'

const initialState: AppStateType = {
  initialized: false,
  isFetching: false,
  categories: [],
  currentCategory: 0,
  currentPrice: 'USD',
  isOpenCurrencies: false,
  attributes: [],
  currentProductID: null,
  productCart: [],
  totalSumOfCartProducts: 0
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
    case actionTypes.SET_CURRENT_PRICE:
      return {
        ...state,
        currentPrice: action.price,
      }
    case actionTypes.SET_IS_OPEN_CURRENCIES:
      return {
        ...state,
        isOpenCurrencies: action.isOpen,
      }
    case actionTypes.SET_CURRENT_PRODUCT_ID:
      return {
        ...state,
        currentProductID: action.id,
      }
    case actionTypes.CLEAR_ATTRIBUTES:
      return {
        ...state,
        attributes: [],
      }
    case actionTypes.SET_ATTRIBUTE:
      if (state.attributes.find(v => v.id === action.attribute.id)) {
        return {
          ...state,
          attributes: state.attributes.map(val => val.id === action.attribute.id ? action.attribute : val),
        }
      }
      return {
        ...state,
        attributes: [...state.attributes, action.attribute],
      }
    case actionTypes.ADD_PRODUCT_IN_CART:
      return {
        ...state,
        productCart: [...state.productCart, action.product],
      }
    case actionTypes.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        productCart: state.productCart.filter((_,i) => i !== action.productId)
      }
    case actionTypes.INC_PRODUCT_COUNT:
      return {
        ...state,
        productCart: state.productCart
          .map((v, i) => i === action.i
            ? {...v, count: ++v.count}
            : v),
      }
    case actionTypes.DEC_PRODUCT_COUNT:
      return {
        ...state,
        productCart: state.productCart
          .map((v, i) => i === action.i
            ? {...v, count: --v.count}
            : v),
      }
    case actionTypes.SET_TOTAL_SUM:
      return {
        ...state,
        totalSumOfCartProducts: state.productCart
          .map(v => (v.prices.find(val => val.currency === state.currentPrice)?.amount || 0) * v.count)
          .reduce((acc,it) => (acc || 0) + (it || 0),0)
      }
    default:
      return state
  }
}
