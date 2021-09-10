import React from 'react'
import styles from './CartModal.module.css'
import { currencyConverter } from '../../common/currency-marks/currencyMarks'

export class CartModal extends React.Component<CartModalPropsType> {
  private readonly wrapperRef: React.RefObject<any>
  state: {
    total: number
  }
  constructor(props: CartModalPropsType) {
    super(props)
    
    this.state = {total: this.totalSum()}
    this.wrapperRef= React.createRef()
  }
  
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }
  
  componentWillUnmount() {
    //
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  
  componentDidUpdate(prevProps: Readonly<CartModalPropsType>, prevState: Readonly<{total: number}>, snapshot?: any) {
    if (prevProps.products !== this.props.products) {
      this.setState({total: this.totalSum()}) // recalculate total sum if changed count of product
    }
  }
  
  handleClickOutside= (event: MouseEvent) =>{
    if (this.wrapperRef
      && !this.wrapperRef.current.contains(event.target)
      && !this.props.node.current.contains(event.target)) {
      this.props.handleModal()
    }
  }
  
  increaseCount = (i: number) => {
    this.props.incCount(i)
  }
  
  decreaseCount = (i: number,count: number) => {
    if (count > 1) this.props.decCount(i)
  }
  
  totalSum = () => {
    return this.props.products
      .map(v => (v.prices.find(val => val.currency === this.props.price)?.amount || 0) * v.count)
      .reduce((acc,it) => (acc || 0) + (it || 0),0)
  }
  
  render() {
    const {products, price, categories,deleteItem} = this.props
    
    return (
      <div className={styles.container} ref={this.wrapperRef}>
        <h4 className={styles.title}>My Bag
          <span className={styles.titleSpan}>
                {`, ${products.length} item${products.length === 1 ? '' : 's'}`}
              </span>
        </h4>
        {products.map((item, index) =>
          (<div className={styles.productItem}>
            <div className={styles.itemDescription}>
              <div className={styles.brand}>{item.brand}</div>
              <div className={styles.brand}>{item.name}</div>
              <div className={styles.price}>
                {`${currencyConverter(price)}${products[index]?.prices.find(v => v.currency === price)?.amount}`}
              </div>
              <div className={styles.attributes}>
                {categories.find(val => val.name === item.category)
                  ?.products.find(pr => pr.name === item.name)
                  ?.attributes.map(v => (<div className={styles.attribute}>
                    <div className={styles.attributeTitle}>
                      {products.find(tm => tm.category === item.category)?.attributes?.find(p =>p.name === v.name)?.name}:
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
                <button className={styles.countBtn} onClick={() =>this.increaseCount(index)}>+</button>
                <div className={styles.count}>{item.count}</div>
                <button className={styles.countBtn} onClick={() => this.decreaseCount(index,item.count)}>-</button>
              </div>
              <div className={styles.imageWrapper}>
                <img className={styles.image} src={item.gallery[0]} alt={''}/>
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
            {`${currencyConverter(price)}${this.state.total.toFixed(2)}`}
          </span>
        </div>
        <div className={styles.buttons}>
          <button className={styles.viewBtn}>view bag</button>
          <button className={styles.checkoutBtn} onClick={() => alert('check out')}>check out</button>
        </div>
      </div>
    )
  }
}
