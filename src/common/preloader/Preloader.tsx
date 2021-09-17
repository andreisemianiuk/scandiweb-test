import React from 'react'
import loader from '../../icons/loader.svg'

export class Preloader extends React.Component {
  render() {
    return <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
      <img src={loader} alt={""}/>
    </div>
  }
}