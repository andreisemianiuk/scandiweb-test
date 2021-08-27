type AppStateType = {
  initialized: boolean
  isFetching: boolean
  categories: ICategory[]
  currentCategory: number
}

interface ICategory {
  name?: string
  products: IProduct[]
}

type PropsCategory = {
  categories: ICategory[]
  current: number
}

interface IProduct {
  id: string
  name: string
  inStock?: boolean
  gallery?: string[]
  description: string
  category: string
  attributes?: IAttributeSet[]
  prices: IPrice[]
  brand: string
}

interface IAttributeSet {
  id: string
  name?: string
  type?: string
  items?: IAttribute[]
}

interface IAttribute {
  id: string
  displayValue?: string
  value?: string
}

interface IPrice {
  currency: string
  amount: number
}

interface ICategories {
  categories: ICategory[]
}
