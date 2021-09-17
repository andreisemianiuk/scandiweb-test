import React from 'react'
import s from './Category.module.css'
import { NavLink } from 'react-router-dom'
import { currencyConverter } from '../../common/currency-marks/currencyMarks'

export class Category extends React.PureComponent<CategoryPropsType> {
  render() {
    const {categories, current, price,setCurrentID} = this.props
    
    return (
      <div className={s.container}>
        <h2 className={s.title}>{categories.length && categories[current].name}</h2>
        <div className={s.products}>
          {categories.length && categories[current].products.map((v: IProduct) =>
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
                    {v.prices && v.prices[0].amount}
                  </div>
                </div>
              </div>
            </NavLink>))
          }
        </div>
      </div>
    )
  }
}
