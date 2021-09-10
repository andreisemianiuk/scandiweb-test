import React from 'react'
import './App.css'
import { NavLink, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import cartIcon from './icons/cart_icon.png'
import {
  addProductInCart,
  clearAttributes,
  decreaseProductCount,
  getCategoriesTC,
  increaseProductCount, removeProductFromCart,
  setAttribute,
  setCurrentCategory,
  setCurrentPrice,
  setCurrentProductID,
  setIsOpenCurrencies,
} from './store/actionCreators'
import { connect } from 'react-redux'
import { Category } from './components/Category'
import { currencyConverter, currencyMarks } from './common/currency-marks/currencyMarks'
import { ProductPage } from './components/ProductPage'
import { Error404 } from './components/Error404'
import { CartPage } from './components/CartPage/CartPage'
import { Modal } from './components/Modal/Modal'
import { CartModal } from './components/CartModal/CartModal'

class App extends React.Component<AppPropsType & RouteComponentProps<any, any, unknown>> {
  state: {
    showModal: boolean
  }
  private readonly cartRef: React.RefObject<HTMLSpanElement>
  
  constructor(props: AppPropsType & RouteComponentProps<any, any, unknown>) {
    super(props)
    
    this.cartRef = React.createRef()
    this.state = {showModal: false}
  }
  
  handleNav(idx: number) {
    this.props.setCurrentCategory(idx)
  }
  
  handleClickModal = () => {
    this.setState({showModal: !this.state.showModal})
  }
  
  openCurrencies = () => {
    this.props.setIsOpenCurrencies(!this.props.isOpenCurrencies)
  }
  
  pickCurrency = (price: string) => {
    this.props.setCurrentPrice(price)
  }
  
  componentDidMount() {
    this.props.getCategoriesTC()
  }
  
  render() {
    const {
      categories, currentCategory, currentPrice,
      isOpenCurrencies, setCurrentProductID,
      currentProductID, attributes, setAttribute,
      clearAttributes, addProductInCart, productCart,
      increaseProductCount,decreaseProductCount,removeProductFromCart
    } = this.props
    return (
      <div className={'App'}>
        {/*==== Modal ====*/}
        {this.state.showModal && <Modal>
          <CartModal products={productCart}
                     price={currentPrice}
                     categories={categories}
                     currentCategory={currentCategory}
                     incCount={increaseProductCount}
                     decCount={decreaseProductCount}
                     handleModal={this.handleClickModal}
                     node={this.cartRef}
                     deleteItem={removeProductFromCart}
          />
        </Modal>}
        {/*==== /Modal ====*/}
        <header className={'header'}>
          {/*==== Navigation ====*/}
          <nav className={'header-nav'}>
            <ul className={'nav-category-list'}>
              {categories.map((v: ICategory, i: number) =>
                <NavLink to={'/product_list'} className={'nav-link'}>
                  <li
                    key={`${v}${i}`}
                    className={`nav-category-item ${i === currentCategory ? 'active' : null}`}
                    onClick={() => this.handleNav(i)}
                  >
                    {v.name}
                  </li>
                </NavLink>)
              }
            </ul>
          </nav>
          {/*==== Logo ====*/}
          <div className={'logo-container'}>
            <span className={'logo-square'}/>
            <span className={'logo-half-circle'}/>
            <span className={'logo-arrow'}/>
          </div>
          {/*==== Actions ====*/}
          <div className={'actions-container'}>
            <div
              className={'actions-currency-switcher'}
              onClick={this.openCurrencies}
            >
              <span className={'actions-currency-value'}>
                {currencyConverter(currentPrice)}
              </span>
              <span className={'actions-currency-arrow'}/>
              <div className={`currencies-list ${isOpenCurrencies ? 'open' : null}`}>
                {Object.entries(currencyMarks).map((v: string[]) =>
                  <div
                    className={'currency-value'}
                    onClick={() => this.pickCurrency(v[0])}
                  >
                    {`${v[1]} ${v[0]}`}
                  </div>)
                }
              </div>
            </div>
            <span className={'actions-cart'} onClick={this.handleClickModal} ref={this.cartRef}>
              <img className={'actions-cart-image'} src={cartIcon} alt=""/>
              {this.props.productCart.length ?
                <span className={'actions-cart-count-icon'}>{this.props.productCart.length}</span> : null}
            </span>
          </div>
        </header>
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
            <Route path={`/cart`} render={() => <CartPage/>}/>
            <Route render={() => <Error404/>}/>
          </Switch>
        </main>
      </div>
    )
  }
}

type MapStateToPropsType = {
  // initialized: boolean
  categories: ICategory[]
  currentCategory: number
  currentPrice: string
  attributes: IAttribute[]
  isOpenCurrencies: boolean
  productCart: IProductInCart[]
  currentProductID: string | null
}

type MapDispatchToPropsType = {
  // initializeApp: () => void
  getCategoriesTC: () => void
  setCurrentCategory: (current: number) => void
  setCurrentPrice: (price: string) => void
  setIsOpenCurrencies: (isOpen: boolean) => void
  setAttribute: (attribute: IAttributeSet) => void
  clearAttributes: () => void
  setCurrentProductID: (id: string) => void
  addProductInCart: (product: IProductInCart) => void
  removeProductFromCart: (productId: number) => void
  increaseProductCount: (i: number) => void
  decreaseProductCount: (i: number) => void
}
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  // initialized: getInitialized(state),
  categories: state.categories,
  currentCategory: state.currentCategory,
  currentPrice: state.currentPrice,
  attributes: state.attributes,
  isOpenCurrencies: state.isOpenCurrencies,
  currentProductID: state.currentProductID,
  productCart: state.productCart,
})

export default withRouter(connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
  mapStateToProps,
  {
    // initializeApp,
    getCategoriesTC,
    setCurrentCategory,
    setCurrentPrice,
    setIsOpenCurrencies,
    setCurrentProductID,
    setAttribute,
    clearAttributes,
    addProductInCart,
    removeProductFromCart,
    increaseProductCount,
    decreaseProductCount,
  })(App))
