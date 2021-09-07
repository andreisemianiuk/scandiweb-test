import React from 'react'
import styles from './CartModal.module.css'
import { currencyConverter } from '../../common/currency-marks/currencyMarks'

export class CartModal extends React.Component<CartModalPropsType> {
  
  // func = () =>{debugger
  //   this.props.products.forEach(item => {
  //     this.props.categories.find(val => val.name === item.category)
  //       ?.products.find(pr => pr.name === item.name)
  //       ?.attributes.map(v => (<div className={styles.attribute}>
  //       {v.type === 'swatch'
  //         ? v.items?.map(it => (<span style={{backgroundColor: `${it.value}`}}/>))
  //         : v.items?.map(it => <span>{it.displayValue}</span>)}
  //     </div>))
  //   })
  //
  // }
  
  render() {
    // this.func()
    const {products, price, categories} = this.props
    
    return (
      <div className={styles.container}>
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
                        (<div className={`${styles.attributeItem} ${products.find(tm =>
                          tm.category === item.category)?.attributes?.find(p =>
                          p.name === v.name)?.items?.find(iz => iz.id === it.id) ? styles.active : null}`}
                              style={{backgroundColor: `${it.value}`}}/>))
                      : v.items?.map(it =>
                        (<div className={`${styles.attributeItem} ${products.find(tm =>
                          tm.category === item.category)?.attributes?.find(p =>
                          p.name === v.name)?.items?.find(iz => iz.id === it.id) ? styles.active : null}`}>
                          {it.displayValue}
                        </div>))}
                  </div>))}
              </div>
            </div>
            <div className={styles.gallery}>
              <div className={styles.buttons}>
                <div className={styles.btn}>+</div>
                <div className={styles.count}>{item.count}</div>
                <div className={styles.btn}>-</div>
              </div>
              <div className={styles.imageWrapper}>
                <img className={styles.image} src={item.gallery[0]} alt={''}/>
              </div>
            </div>
          </div>),
        )}
      </div>
    )
  }
}
