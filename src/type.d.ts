type AppStateType = {
  initialized: boolean
  isFetching: boolean
  categories: ICategory[]
  currentCategory: number
  currentPrice: string
  isOpenCurrencies: boolean
  currentProductID: string | null
}

interface ICategory {
  name?: string
  products: IProduct[]
}

type PropsCategory = {
  categories: ICategory[]
  current: number
  price: string
  currentID: string | null
  setCurrentID: (id: string) => void
}

type ProductPagePropsType = {
  price: string
  product: IProduct | undefined
}

type CurrencyMarksType = {
  ['USD']: string
  ['GBR']: string
  ['AUD']: string
  ['JPY']: string
  ['RUB']: string
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
