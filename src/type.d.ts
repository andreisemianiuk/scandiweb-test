type AppStateType = {
  initialized: boolean
  isFetching: boolean
  categories: ICategory[]
  currentCategory: number
  currentPrice: string
  attributes: IAttributeSet[] | []
  isOpenCurrencies: boolean
  currentProductID: string | null
  productCart: IProductInCart[]
}

interface IProductInCart {
  name: string
  brand: string
  category: string
  gallery: string[]
  prices: IPrice[]
  attributes: IAttributeSet[]
  count: number
}

interface ICategory {
  name?: string
  products: IProduct[]
}

type PropsCategory = {
  categories: ICategory[]
  current: number
  price: string
  setCurrentID: (id: string) => void
}

type ProductPagePropsType = {
  price: string
  product: IProduct | undefined
  productCart: IProductInCart[]
  attributes: IAttributeSet[]
  setAttr: (attribute: IAttributeSet) => void
  clearAttr: () => void
  addProduct: (product: IProductInCart) => void
}

type CartModalPropsType = {
  products: IProductInCart[]
  price: string
  categories: ICategory[]
  currentCategory: number
  incCount: (i: number) => void
  decCount: (i: number) => void
  handleModal: () => void
  node: any
}

type CurrencyMarksType = {
  ['USD']: string
  ['GBP']: string
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
  attributes: IAttributeSet[]
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
