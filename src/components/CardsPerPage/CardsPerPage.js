import React from 'react'

export default function CardsPerPage (props) {
  const {
    setCountOfCardsToFifty,
    setCountOfCardsToTwenty,
    setCountOfCardsToTen
  } = props

  return (
    <div>
      <button onClick={setCountOfCardsToTen}>10</button>
      <button onClick={setCountOfCardsToTwenty}>20</button>
      <button onClick={setCountOfCardsToFifty}>50</button>
    </div>
  )
}
