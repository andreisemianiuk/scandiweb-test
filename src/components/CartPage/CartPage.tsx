import React from 'react'
import s from './CartPage.module.css'
import { CartProducts } from './CartProducts'

export class CartPage extends React.PureComponent<CartPropsType> {
  
  render() {
    const {products,price,incCount,decCount,deleteItem,categories,totalSum,setTotalSum} = this.props
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
        />
      </div>
    )
  }
}
