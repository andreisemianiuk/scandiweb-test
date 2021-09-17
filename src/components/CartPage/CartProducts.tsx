import React from 'react'
import { currencyConverter } from '../../common/currency-marks/currencyMarks'

class CartProducts extends React.PureComponent<CartPropsType> {
  state: {
    currentImages: number[] | []
  }
  
  constructor(props: CartPropsType) {
    super(props)
    this.state = {
      currentImages: [],
    }
  }
  
  componentDidMount() {
    this.props.setTotalSum()
    this.setState({currentImages: Array(this.props.products.length).fill(0)})
  }
  
  componentDidUpdate(prevProps: Readonly<CartModalPropsType>, prevState: Readonly<{ total: number }>, snapshot?: any) {
    if (prevProps.products !== this.props.products) {
      this.props.setTotalSum() // recalculate total sum if changed count of product
    }
  }
  
  handleLeft = (i: number) => {
    if (this.state.currentImages[i] > 0) {
      this.setState(
        {
          currentImages: this.state.currentImages
            .map((v, idx) => i === idx ? v - 1 : v),
        })
    }
  }
  
  handleRight = (i: number) => {
    if (this.state.currentImages[i] < this.props.products[i].gallery.length - 1) {
      this.setState(
        {
          currentImages: this.state.currentImages
            .map((v, idx) => i === idx ? v + 1 : v),
        })
    }
  }
  
  increaseCount = (i: number) => {
    this.props.incCount(i)
    this.props.setTotalSum()
  }
  
  decreaseCount = (i: number, count: number) => {
    if (count > 1) {
      this.props.decCount(i)
      this.props.setTotalSum()
    }
  }
  
  render() {
    const {products, price, deleteItem, categories, styles} = this.props
    return (
      <>
        {products.map((item, index) =>
          (<div className={styles.productItem}>
            <div className={styles.itemDescription}>
              <div className={styles.brand}>{item.brand}</div>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.price}>
                {`${currencyConverter(price)}${products[index]?.prices.find(v => v.currency === price)?.amount}`}
              </div>
              <div className={styles.attributes}>
                {categories.find(val => val.name === item.category)
                  ?.products.find(pr => pr.name === item.name)
                  ?.attributes.map(v => (<div className={styles.attribute}>
                    <div className={styles.attributeTitle}>
                      {products.find(tm => tm.category === item.category)?.attributes?.find(p => p.name === v.name)?.name}:
                    </div>
                    {v.type === 'swatch'
                      ? v.items?.map(it =>
                        (<div className={`${styles.attributeItem} ${products[index]?.attributes?.find(p =>
                          p.name === v.name)?.items?.find(iz => iz.value === it.value) ? styles.active : null}`}
                              style={{backgroundColor: `${it.value}`}}/>))
                      : v.items?.map(it =>
                        (<div className={`${styles.attributeItem} ${products[index]?.attributes?.find(p =>
                          p.name === v.name)?.items?.find(iz => iz.value === it.value) ? styles.active : null}`}>
                          {it.value}
                        </div>))}
                  </div>))}
              </div>
            </div>
            <div className={styles.gallery}>
              <div className={styles.countButtons}>
                <button className={styles.countBtn} onClick={() => this.increaseCount(index)}>
                  <span className={styles.plus}/>
                </button>
                <div className={styles.count}>{item.count}</div>
                <button className={styles.countBtn} onClick={() => this.decreaseCount(index, item.count)}>
                  <span className={styles.minus}/>
                </button>
              </div>
              <div className={styles.imageWrapper}>
                <div className={styles.imageArrowsContainer}>
                  <img className={styles.image} src={item.gallery[this.state.currentImages[index]]} alt={''}/>
                  <span className={styles.leftArrow} onClick={() => this.handleLeft(index)}/>
                  <span className={styles.rightArrow} onClick={() => this.handleRight(index)}/>
                </div>
                <div className={styles.deleteItem}>
                  <button className={styles.deleteBtn} onClick={() => deleteItem(index)}>delete</button>
                </div>
              </div>
            
            </div>
          </div>),
        )}
        <div className={styles.totalSum}>
          <span className={styles.totalTitle}>Total</span>
          <span className={styles.totalPrice}>
            {`${currencyConverter(price)}${this.props.totalSum.toFixed(2)}`}
          </span>
        </div>
      </>
    )
  }
}

export default CartProducts