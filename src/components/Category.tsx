import React from 'react'
import { NavLink } from 'react-router-dom'
import { currencyConverter } from '../common/currency-marks/currencyMarks'

export class Category extends React.PureComponent<PropsCategory> {
  render() {
    const {categories, current, price,setCurrentID} = this.props
    
    return (
      <div className={'category-container'}>
        <h2 className={'category-title'}>{categories.length && categories[current].name}</h2>
        <div className={'category-products'}>
          {categories.length && categories[current].products.map((v: IProduct) =>
            (<NavLink to={`product_description`} className={'product-description-link'} onClick={() => setCurrentID(v.id)}>
              <div className={'category-product-card'}>
                <div className={`card-image-wrapper`}>
                  {!v.inStock && <span className={'card-stock-state'}>out of stock</span>}
                  <img className={`card-image ${!v.inStock && 'out'}`} src={v.gallery && v.gallery[0]} alt={''}/>
                </div>
                <div>
                  <div className={'card-name'}>{v.name}</div>
                  <div className={'card-price'}>
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
