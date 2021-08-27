import React from 'react'
import './App.css'
import cartIcon from './icons/cart_icon.png'
import { getCategoriesTC, setCurrentCategory } from './store/actionCreators'
import { connect } from 'react-redux'
import { Category } from './components/Category'

class App extends React.PureComponent<AppPropsType> {
  handleNav(idx: number) {
    this.props.setCurrentCategory(idx)
  }
  
  componentDidMount() {
    this.props.getCategoriesTC()
  }
  
  render() {
    const {categories,currentCategory} = this.props
    return (
      <div className={'App'}>
        <header className={'header'}>
          {/*==== Navigation ====*/}
          <nav className={'header-nav'}>
            <ul className={'nav-category-list'}>
              {categories.map((v: ICategory, i: number) =>
                <li
                  key={`${v}${i}`}
                  className={`nav-category-item ${i === currentCategory ? 'active' : null}`}
                  onClick={() => this.handleNav(i)}
                >
                  {v.name}
                </li>)
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
            <div className={'actions-currency-switcher'}>
              <span className={'actions-currency-value'}>$</span>
              <span className={'actions-currency-arrow'}/>
            </div>
            <span>
              <img className={'actions-cart'} src={cartIcon} alt=""/>
            </span>
          </div>
        </header>
        <main>
          <Category categories={categories} current={currentCategory}/>
        </main>
      </div>
    )
  }
}

type MapStateToPropsType = {
  // initialized: boolean
  categories: ICategory[]
  currentCategory: number
}

type MapDispatchToPropsType = {
  // initializeApp: () => void
  getCategoriesTC: () => void
  setCurrentCategory: (current: number) => void
}
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  // initialized: getInitialized(state),
  categories: state.categories,
  currentCategory: state.currentCategory
})

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
  mapStateToProps,
  {
    // initializeApp,
    getCategoriesTC,
    setCurrentCategory
  })(App)
