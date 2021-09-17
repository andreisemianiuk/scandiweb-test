import React from 'react'
import s from './CartPage.module.css'
import CartProducts from './CartProducts'
import { RouteComponentProps, withRouter } from 'react-router-dom'

class CartPage extends React.PureComponent<CartPropsType & RouteComponentProps<any, any, unknown>> {
  checkOut = () => {
    if (this.props.products.length) {
      alert('products has been bought successfully')
      this.props.clearCart && this.props.clearCart()
      this.props.history.push('/')
    } else {
      alert('add some product')
    }
  }
  render() {
    const {products,price,incCount,decCount,deleteItem,categories,totalSum,setTotalSum,clearCart} = this.props
    return (
      <div className={s.container}>
        <h3 className={s.title}>Cart</h3>
        <CartProducts products={products}
                      categories={categories}
                      price={price}
                      incCount={incCount}
                      decCount={decCount}
                      deleteItem={deleteItem}
                      styles={s}
                      totalSum={totalSum}
                      setTotalSum={setTotalSum}
                      clearCart={clearCart}
        />
        <div className={s.btnWrapper}>
          <button className={s.checkOutBtn} onClick={this.checkOut}>check out</button>
        </div>
      </div>
    )
  }
}

export default withRouter(CartPage)