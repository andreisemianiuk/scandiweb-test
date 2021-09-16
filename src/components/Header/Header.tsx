import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { currencyConverter, currencyMarks } from '../../common/currency-marks/currencyMarks'
import cartIcon from '../../icons/cart_icon.png'

export class Header extends React.PureComponent<HeaderPropsType> {
  
  handleNav(idx: number) {
    this.props.setCurrentCategory(idx)
  }
  
  openCurrencies = () => {
    this.props.setIsOpenCurrencies(!this.props.isOpenCurrencies)
  }
  
  pickCurrency = (price: string) => {
    this.props.setCurrentPrice(price)
  }
  
  render() {
    const {categories,currentCategory,isOpenCurrencies,productCart,currentPrice,handleClickModal} = this.props
    return (
      <header className={s.header}>
        {/*==== Navigation ====*/}
        <nav>
          <ul className={s.navList}>
            {categories.map((v: ICategory, i: number) =>
              <NavLink to={'/product_list'} className={s.navLink}>
                <li
                  key={`${v}${i}`}
                  className={`${s.navItem} ${i === currentCategory ? s.active : null}`}
                  onClick={() => this.handleNav(i)}
                >
                  {v.name}
                </li>
              </NavLink>)
            }
          </ul>
        </nav>
        {/*==== Logo ====*/}
        <div className={s.logoContainer}>
          <span className={s.logoSquare}/>
          <span className={s.logoHalfCircle}/>
          <span className={s.logoArrow}/>
        </div>
        {/*==== Actions ====*/}
        <div className={s.actionsContainer}>
          <div
            className={s.currencySwitcher}
            onClick={this.openCurrencies}
          >
              <span className={s.currencySwitcherValue}>
                {currencyConverter(currentPrice)}
              </span>
            <span className={s.currencyArrow}/>
            <div className={`${s.currenciesList} ${isOpenCurrencies ? s.open : null}`}>
              {Object.entries(currencyMarks).map((v: string[]) =>
                <div
                  className={s.currencyValue}
                  onClick={() => this.pickCurrency(v[0])}
                >
                  {`${v[1]} ${v[0]}`}
                </div>)
              }
            </div>
          </div>
          <span className={s.cart} onClick={handleClickModal} ref={this.props.setRef}>
              <img className={s.cartImage} src={cartIcon} alt=""/>
            {productCart.length ?
              <span className={s.cartCount}>{productCart.length}</span> : null}
            </span>
        </div>
      </header>
    )
  }
}