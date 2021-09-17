import React from 'react'
import './App.css'
import { Redirect, Route, Switch } from 'react-router-dom'
import {
  addProductInCart,
  clearAttributes,
  clearProductCart,
  decreaseProductCount,
  getCategoriesTC,
  increaseProductCount,
  removeProductFromCart,
  setAttribute,
  setCurrentCategory,
  setCurrentPrice,
  setCurrentProductID,
  setIsOpenCurrencies,
  setTotalSum,
} from './store/actionCreators'
import { connect } from 'react-redux'
import { Category } from './components/Category/Category'
import { ProductPage } from './components/ProductPage/ProductPage'
import { Error404 } from './components/Error404/Error404'
import { Modal } from './components/Modal/Modal'
import { Header } from './components/Header/Header'
import CartPage from './components/CartPage/CartPage'
import CartModal from './components/CartModal/CartModal'
import { Preloader } from './common/preloader/Preloader'

class App extends React.Component<AppPropsType> {
  state: {
    showModal: boolean
  }
  private childRef: any
  
  constructor(props: AppPropsType) {
    super(props)
    
    this.setRef = this.setRef.bind(this)
    this.state = {showModal: false}
  }
  
  componentDidMount() {
    this.props.getCategoriesTC()
    this.childRef && this.childRef.focus()
  }
  
  setRef(input: any) {
    this.childRef = input
  }
  
  handleClickModal = () => {
    this.setState({showModal: !this.state.showModal})
  }
  
  
  render() {
    const {
      categories, currentCategory, currentPrice, setCurrentPrice,
      isOpenCurrencies, setCurrentProductID, setIsOpenCurrencies,
      currentProductID, attributes, setAttribute, isFetching,
      clearAttributes, addProductInCart, productCart, clearProductCart,
      increaseProductCount, decreaseProductCount, setCurrentCategory,
      removeProductFromCart, totalSumOfCartProducts, setTotalSum,
    } = this.props
    return (
      <>
        {isFetching
          // display loader while fetching data from server
          ? <Preloader/>
          : <div className={'App'}>
            {/*==== Modal ====*/}
            {this.state.showModal && <Modal>
              <CartModal products={productCart}
                         price={currentPrice}
                         categories={categories}
                         currentCategory={currentCategory}
                         incCount={increaseProductCount}
                         decCount={decreaseProductCount}
                         handleModal={this.handleClickModal}
                         node={this.childRef}
                         deleteItem={removeProductFromCart}
                         clearCart={clearProductCart}
                         totalSum={totalSumOfCartProducts}
                         setTotalSum={setTotalSum}
              />
            </Modal>}
            {/*==== /Modal ====*/}
            <Header categories={categories}
                    currentCategory={currentCategory}
                    isOpenCurrencies={isOpenCurrencies}
                    productCart={productCart}
                    setCurrentCategory={setCurrentCategory}
                    currentPrice={currentPrice}
                    setCurrentPrice={setCurrentPrice}
                    setIsOpenCurrencies={setIsOpenCurrencies}
                    handleClickModal={this.handleClickModal}
                    setRef={this.setRef}
            />
            <main>
              <Switch>
                <Route path={'/'} exact render={() => <Redirect to={'product_list'}/>}/>
                <Route path={'/product_list'} render={() =>
                  <Category
                    categories={categories}
                    current={currentCategory}
                    price={currentPrice}
                    setCurrentID={setCurrentProductID}
                  />}
                />
                <Route
                  path={`/product_description`}
                  render={() =>
                    <ProductPage
                      product={categories[currentCategory]?.products.find((v: IProduct) => v.id === currentProductID)}
                      productCart={productCart}
                      price={currentPrice}
                      attributes={attributes}
                      setAttr={setAttribute}
                      clearAttr={clearAttributes}
                      addProduct={addProductInCart}
                    />}
                />
                <Route path={`/cart`} render={() =>
                  <CartPage
                    products={productCart}
                    price={currentPrice}
                    decCount={decreaseProductCount}
                    incCount={increaseProductCount}
                    deleteItem={removeProductFromCart}
                    categories={categories}
                    totalSum={totalSumOfCartProducts}
                    setTotalSum={setTotalSum}
                    clearCart={clearProductCart}
                  />}
                />
                <Route render={() => <Error404/>}/>
              </Switch>
            </main>
          </div>
        }
      </>
    )
  }
}

type MapStateToPropsType = {
  isFetching: boolean
  categories: ICategory[]
  currentCategory: number
  currentPrice: string
  attributes: IAttribute[]
  isOpenCurrencies: boolean
  currentProductID: string | null
  productCart: IProductInCart[]
  totalSumOfCartProducts: number
}

type MapDispatchToPropsType = {
  getCategoriesTC: () => void
  setCurrentCategory: (current: number) => void
  setCurrentPrice: (price: string) => void
  setIsOpenCurrencies: (isOpen: boolean) => void
  setAttribute: (attribute: IAttributeSet) => void
  clearAttributes: () => void
  setCurrentProductID: (id: string) => void
  addProductInCart: (product: IProductInCart) => void
  removeProductFromCart: (productId: number) => void
  clearProductCart: () => void
  increaseProductCount: (i: number) => void
  decreaseProductCount: (i: number) => void
  setTotalSum: () => void
}
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isFetching: state.isFetching,
  categories: state.categories,
  currentCategory: state.currentCategory,
  currentPrice: state.currentPrice,
  attributes: state.attributes,
  isOpenCurrencies: state.isOpenCurrencies,
  currentProductID: state.currentProductID,
  productCart: state.productCart,
  totalSumOfCartProducts: state.totalSumOfCartProducts,
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
  mapStateToProps,
  {
    getCategoriesTC,
    setCurrentCategory,
    setCurrentPrice,
    setIsOpenCurrencies,
    setCurrentProductID,
    setAttribute,
    clearAttributes,
    addProductInCart,
    removeProductFromCart,
    clearProductCart,
    increaseProductCount,
    decreaseProductCount,
    setTotalSum,
  })(App)
