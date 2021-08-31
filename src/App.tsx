import React from 'react'
import './App.css'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import cartIcon from './icons/cart_icon.png'
import {
  getCategoriesTC,
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
import { Cart } from './components/Cart'

class App extends React.Component<AppPropsType> {
  handleNav(idx: number) {
    this.props.setCurrentCategory(idx)
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
    const {categories, currentCategory,currentPrice,isOpenCurrencies,setCurrentProductID,currentProductID} = this.props
    return (
      <div className={'App'}>
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
            <span>
              <img className={'actions-cart'} src={cartIcon} alt=""/>
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
                currentID={currentProductID}
              />}
            />
            <Route
              path={`/product_description`}
              render={() =>
                <ProductPage
                  product={categories[currentCategory]?.products.find((v:IProduct) => v.id === currentProductID)}
                  price={currentPrice}
                />}
            />
            <Route path={`/cart`} render={() => <Cart/>}/>
            <Route render={() => <Error404 />}/>
          </Switch>
          
          {/*<ProductPage/>*/}
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
  isOpenCurrencies: boolean
  currentProductID: string | null
}

type MapDispatchToPropsType = {
  // initializeApp: () => void
  getCategoriesTC: () => void
  setCurrentCategory: (current: number) => void
  setCurrentPrice: (price: string) => void
  setIsOpenCurrencies: (isOpen: boolean) => void
  setCurrentProductID: (id: string) => void
}
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  // initialized: getInitialized(state),
  categories: state.categories,
  currentCategory: state.currentCategory,
  currentPrice: state.currentPrice,
  isOpenCurrencies: state.isOpenCurrencies,
  currentProductID: state.currentProductID
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
  mapStateToProps,
  {
    // initializeApp,
    getCategoriesTC,
    setCurrentCategory,
    setCurrentPrice,
    setIsOpenCurrencies,
    setCurrentProductID,
  })(App)
