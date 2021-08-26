import React from 'react'
import './App.css'
import { Category } from './components/Category'
import { client, Query } from '@tilework/opus'
import { ICategories, ICategory } from './ts/interfaces/interfaces'
import cartIcon from './icons/cart_icon.png'

export class App extends React.Component {
  state: ICategories
  
  constructor() {
    super({})
    this.state = {
      categories: [],
    }
  }
  
  async fetchGraphQL(newQuery: Query<string, unknown, boolean>): Promise<any> {
    client.setEndpoint('http://localhost:4000/graphql')
    return await client.post(newQuery)
  }
  
  componentDidMount() {
    //fetching categories names
    const categories = this.fetchGraphQL(new Query('categories {\n' +
      '    name\n' +
      '    products {\n' +
      '      id\n' +
      '      name\n' +
      '      inStock\n' +
      '      category\n' +
      '      brand\n' +
      '    }\n' +
      '  }', true))
    categories.then(res => {
      this.setState({categories: [...res.categories]})
      // console.log('state: ', this.state)
    })
  }
  
  render() {
    return (
      <div className={'App'}>
        <header className={'header'}>
          {/*==== Navigation ====*/}
          <nav className={'header-nav'}>
            <ul className={'nav-category-list'}>
              {this.state.categories.map((v: ICategory) =>
                <li
                  key={v.name || '' + Date.now()}
                  className={`nav-category-item ${v.name === 'tech' ? 'active' : null}`}
                >
                  {v.name}
                </li>)
              }
            </ul>
          </nav>
          {/*==== Logo ====*/}
          <div className={'logo-container'}>
            <span className={'logo-square'}/>
            <span className={'logo-half-circle'}/>
            <span className={'logo-arrow'}/>
          </div>
          {/*==== Actions ====*/}
          <div className={'actions-container'}>
            <div className={'actions-currency-switcher'}>
              <span className={'actions-currency-value'}>$</span>
              <span className={'actions-currency-arrow'}/>
            </div>
            <span>
              <img className={'actions-cart'} src={cartIcon} alt=""/>
            </span>
          </div>
        </header>
        <main>
          <Category categories={this.state.categories}/>
        </main>
      </div>
    )
  }
}

