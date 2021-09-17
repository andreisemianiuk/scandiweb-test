import React from 'react'
import s from './ProductPage.module.css'
import { currencyConverter } from '../../common/currency-marks/currencyMarks'

export class ProductPage extends React.Component<ProductPagePropsType> {
  state: {
    currentImageIndex: number
    buttonColor: string
  }
  
  constructor(props: ProductPagePropsType) {
    super(props)
    this.state = {
      currentImageIndex: 0,
      buttonColor: 'inherit',
    }
  }
  
  
  componentWillUnmount() {
    this.props.clearAttr()
  }
  
  addProductHandler = () => {
    const { product,attributes, productCart} = this.props
    if (attributes.length < (product?.attributes?.length || 0)) {
      alert('Please choose all attributes!')
      return
    }
    
    const newProduct: IProductInCart = {
      name: product?.name || '',
      brand: product?.brand || '',
      category: product?.category || '',
      gallery: product?.gallery || [],
      prices: product?.prices || [],
      attributes,
      count: 1,
    }
    
    // the res variable contains a check for duplicates in the grocery cart
    const res = productCart.filter(v => v.name === newProduct.name)
      .find(o => o.attributes
        .every((p, pi) => p.items
          ?.every((n, ni) => {
            // @ts-ignore
            return n.displayValue === newProduct.attributes[pi].items[ni].displayValue
          })))
    
    const attributesValues = newProduct.attributes.map(at => at.items?.map(v => v.displayValue))
    
    if (!res) {
      this.props.addProduct(newProduct)
      // alert(`${newProduct.name} ${attributesValues} added`)
    } else {
      alert(`This ${newProduct.name} ${attributesValues} has been already added to the cart`)
    }
  }
  
  chooseAttribute = (ID: string, id: string) => {
    let attr = this.props.product?.attributes.find(item => item.id === ID)
    let res = {...attr, items: attr?.items?.filter(v => v.id === id)}
    // @ts-ignore
    this.props.setAttr(res)
  }
  
  
  render() {
    const {product, price} = this.props
    return (
      <div className={s.container}>
        <div className={s.smallImages}>
          {product?.gallery?.map((v, i) =>
            <img className={s.smallImageItem} src={v} alt={''}
                 onMouseOver={() => this.setState({currentImageIndex: i})}
            />,
          )}
        </div>
        <div className={s.mainImageWrapper}>
          <img className={s.mainImage}
               src={product?.gallery?.length ? product?.gallery[this.state.currentImageIndex] : ''} alt={''}/>
        </div>
        <div className={s.description}>
          <h3 className={s.title}>{product?.name}</h3>
          <div className={s.brand}>{product?.brand}</div>
          {/*==== Attributes ====*/}
          <div>
            {product?.attributes?.map(v => (
              <div>
                <div className={s.attributesTitle}>{v.name}:</div>
                <div className={s.attributesWrapper}>
                  {/*==== display attribute items by type of attribute ====*/}
                  {v.type === 'swatch'
                    ? v.items?.map(val =>
                      <span onClick={() => {
                        this.chooseAttribute(v.id, val.id)
                      }}
                            className={`${s.attributeItem} ${this.props.attributes
                              .find(it => it.id === v.id)?.items
                              ?.find(itm => itm.id === val.id) ? s.activeSwatch : null}`}
                            style={{backgroundColor: `${val.value}`}}
                      />)
                    : v.items?.map(val =>
                      <span
                        className={`${s.attributeItem} ${this.props.attributes
                          .find(it => it.id === v.id)?.items
                          ?.find(itm => itm.id === val.id) ? s.active : null}`}
                        onClick={() => {
                          this.chooseAttribute(v.id, val.id)
                        }}>
                      {val.value}
                    </span>)
                  }
                </div>
              </div>
            ))}
          </div>
          {/*==== Price ====*/}
          <div>
            <div className={s.attributesTitle}>Price:</div>
            <div className={s.priceValue}>
              {`${currencyConverter(price)}${product?.prices.find(v => v.currency === price)?.amount}`}
            </div>
          </div>
          {/*==== Add Button ====*/}
          <button className={`${s.addButton} ${product?.inStock ? null : s.disabled}`}
                  onClick={this.addProductHandler}
                  disabled={!product?.inStock}
          >
            Add to cart
          </button>
          {/*==== Description ====*/}
          <div className={s.descriptionText} dangerouslySetInnerHTML={{__html: product?.description || ''}}/>
        </div>
      </div>
    )
  }
}