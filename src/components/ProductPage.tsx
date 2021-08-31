import React from 'react'
import { currencyConverter } from '../common/currency-marks/currencyMarks'

export class ProductPage extends React.Component<ProductPagePropsType> {
  state: { currentImageIndex: number }

  constructor() {
    super({product: undefined, price: 'USD'})
    this.state = {currentImageIndex: 0}
  }
  
  render() {
    const {product,price} = this.props
    return (
      <div className={'product-page-container'}>
        <div className={'product-small-images'}>
          {product?.gallery?.map((v, i) =>
            <img className={'small-image-item'} src={v} alt={''}
              onClick={() => this.setState({currentImageIndex: i})}
            />,
          )}
        </div>
        <div className={'product-main-image-wrapper'}>
          <img className={'product-main-image'}
               src={product?.gallery?.length ? product?.gallery[this.state.currentImageIndex] : ''} alt={''}/>
        </div>
        <div className={'product-description'}>
          <h3 className={'product-title'}>{product?.name}</h3>
          <div className={'product-brand-name'}>{product?.brand}</div>
        {/*==== Attributes ====*/}
          <div>
            {product?.attributes?.map(v => (
              <div>
                <div className={'attribute-items-title'}>{v.name}:</div>
                <div className={'attribute-items-wrapper'}>
                  {v.type === 'swatch'
                    ? v.items?.map(val =>
                      <span
                        className={'attribute-item'}
                        style={{
                          backgroundColor: `${val.value}`,
                          color: `${val.displayValue === 'Black' ? 'white' : 'inherit'}`,
                        }}
                      >
                      {val.displayValue}
                    </span>)
                    : v.items?.map(val => <span className={'attribute-item'}>{val.value}</span>)
                  }
                </div>
              </div>
            ))}
          </div>
        {/*==== Price ====*/}
          <div>
            <div className={'attribute-items-title'}>Price:</div>
            <div className={'product-price-value'}>
              {`${currencyConverter(price)}${product?.prices.find(v => v.currency === price)?.amount}`}
            </div>
          </div>
        {/*==== Add Button ====*/}
          <button className={'product-add-button'}>Add to cart</button>
        {/*==== Description ====*/}
          <div className={'product-description-text'} dangerouslySetInnerHTML={{__html: product?.description || ''}}/>
        </div>
      </div>
    )
  }
}