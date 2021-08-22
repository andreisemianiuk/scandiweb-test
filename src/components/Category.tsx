import { Query } from '@tilework/opus'
import React from 'react'
import { App } from '../App'


export class Category extends React.Component {
  state: Object
  
  constructor() {
    super({})
    this.state = {categories: []}
  }
  
  componentDidMount() {
    const data = App.prototype.fetchGraphQL
    (new Query('category {\n' +
        '    name\n' +
        '    products {\n' +
        '      id\n' +
        '      name\n' +
        '      category\n' +
        '      brand\n' +
        '    }\n' +
        '  }', true),
      // .addArgument('limit', 'CategoryInput', 'tech'),
    ).then((res) => {
      debugger
      // @ts-ignore
      console.log(res.category)
      let x = 'state'
      this.setState({categories: x})
      console.log(this.state)
    })
    console.log(data)
  }
  
  render() {
    debugger
    return (
      <>
        {/*{categories && categories.map((v: any) => <div>{v.name}</div>)}*/}
      </>
    )
  }
}

interface ICategory {
  name?: string
  products: IProduct[]
}

interface IProduct {
  id: string
  name: string
  inStock?: boolean
  gallery?: string[]
  description: string
  category: string
  attributes?: IAttributeSet[]
  prices: IPrice[]
  brand: string
}

interface IAttributeSet {
  id: string
  name?: string
  type?: string
  items?: IAttribute[]
}

interface IAttribute {
  id: string
  displayValue?: string
  value?: string
}

interface IPrice {
  currency: string
  amount: number
}

interface IProps extends IExternalProps {
  data: IData
}

interface IData {
  categories: ICategory[]
}

interface IExternalProps {
  id: string
}
