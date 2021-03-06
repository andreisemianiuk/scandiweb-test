import React from 'react'
import styles from './CartModal.module.css'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import CartProducts from '../CartPage/CartProducts'

class CartModal extends React.PureComponent<CartModalPropsType & RouteComponentProps<any, any, unknown>> {
  private readonly wrapperRef: React.RefObject<any>
  
  constructor(props: CartModalPropsType & RouteComponentProps<any, any, unknown>) {
    super(props)
    this.wrapperRef = React.createRef()
  }
  
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside)
  }
  
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
  
  handleClickOutside = (event: MouseEvent) => {
    if (this.wrapperRef
      // check if the click was outside the cart
      && !this.wrapperRef.current.contains(event.target)
      && ![...this.props.node.children].includes(event.target)) {
      this.props.handleModal()
    }
  }
  
  handleViewBtn = () => {
    this.props.history.push('cart')
    this.props.handleModal()
  }
  
  checkOut = () => {
    if (this.props.products.length) {
      this.props.clearCart()
      this.props.handleModal()
      this.props.history.push('/')
      alert('products has been bought successfully')
    } else {
      alert('add some product')
    }
  }
  
  render() {
    const {products, price, categories, deleteItem, incCount, decCount, totalSum, setTotalSum} = this.props
    
    return (
      <div className={styles.container} ref={this.wrapperRef}>
        <h4 className={styles.title}>My Bag
          <span className={styles.titleSpan}>
                {`, ${products.length} item${products.length === 1 ? '' : 's'}`}
              </span>
        </h4>
        <CartProducts products={products}
                      price={price}
                      categories={categories}
                      incCount={incCount}
                      decCount={decCount}
                      deleteItem={deleteItem}
                      styles={styles}
                      totalSum={totalSum}
                      setTotalSum={setTotalSum}
        />
        <div className={styles.buttons}>
          <button className={styles.viewBtn} onClick={this.handleViewBtn}>view bag</button>
          <button className={styles.checkoutButton} onClick={this.checkOut}>check out</button>
        </div>
      </div>
    )
  }
}

export default withRouter(CartModal)