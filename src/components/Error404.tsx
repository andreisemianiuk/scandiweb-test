import React from 'react'

export class Error404 extends React.Component {
  render() {
    return (
      <div className={'error-container'}>
        <div className={'error-number'}>404</div>
        <div className={'error-text'}>Page not found!</div>
        <div className={'error-smile'}>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
      </div>
    )
  }
}
