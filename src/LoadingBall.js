import React from 'react'
import loadingBall from './pokeball.png'
import './loadingBall.styl'
export default function LoadingBall() {
  return (
    <div className='LoadingWrapper'>
      <img className='LoadingBall' src={loadingBall} width={75} height={75}/>
    </div>
  )
}
