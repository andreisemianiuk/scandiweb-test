import React from 'react'
import './App.css'
import { Category } from './components/Category'
import { client, Query } from '@tilework/opus'

export class App extends React.Component {

  async fetchGraphQL(newQuery: Query<string, unknown, boolean>) {
    client.setEndpoint('http://localhost:4000/graphql')
    return await client.post(newQuery)
  }
  render() {
    return (
      <div>
        <h2>My first Apollo app 🚀</h2>
        <Category/>
      </div>
    )
  }
}

