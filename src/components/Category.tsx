import React from 'react'

export class Category extends React.Component<PropsCategory> {
  render() {
    const {categories, current} = this.props
    console.log(this.props)
    return (
      <div className={'category-container'}>
        <h2 className={'category-title'}>{categories[current].name}</h2>
        <div className={'category-products'}>
          {categories[current].products.map((v: IProduct) => <div>{v.name}</div>)}
        </div>
      </div>
    )
  }
}
