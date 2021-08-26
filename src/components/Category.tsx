import React from 'react'
import { ICategories } from '../ts/interfaces/interfaces'


export class Category extends React.Component<ICategories> {
  
  render() {
    return (
      <div className={'category-container'}>
        {/*<h2>{this.props.categories.}</h2>*/}
        {/*{this.props.categories && categories.map((v: any) => <div>{v.name}</div>)}*/}
      </div>
    )
  }
}
