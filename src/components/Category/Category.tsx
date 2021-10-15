import React from 'react'
import s from './Category.module.css'
import { NavLink } from 'react-router-dom'
import { currencyConverter } from '../../common/currency-marks/currencyMarks'

export class Category extends React.PureComponent<{ categories: ICategory[], current: number, price: string, setCurrentID: (id: string) => void }> {
  render() {
    const {categories, current, price, setCurrentID} = this.props
    let arrOfProducts = categories.some((_, i) => current === i)
      ? categories.filter((_, i) => i === current)
      : categories
    return (
      <div className={s.container}>
        <h2 className={s.title}>{categories.length && current !== 2 ? categories[current]?.name : 'All'}</h2>
        <div className={s.products}>
          {arrOfProducts.length && arrOfProducts.map(cat => cat.products.map((v: IProduct) =>
            (<NavLink to={`product_description`} className={s.productLink} onClick={() => setCurrentID(v.id)}>
              <div className={`${s.productCard} ${!v.inStock && s.out}`}>
                <div className={s.imageWrapper}>
                  {!v.inStock && <span className={s.stockState}>out of stock</span>}
                  <img className={s.image} src={v.gallery && v.gallery[0]} alt={''}/>
                </div>
                <div>
                  <div className={s.name}>{v.name}</div>
                  <div className={s.price}>
                    {currencyConverter(price)}
                    {v.prices && v.prices.find(v => v.currency === price)?.amount}
                  </div>
                </div>
              </div>
            </NavLink>)))
          }
        </div>
      </div>
    )
  }
}
