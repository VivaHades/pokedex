import React from 'react'

export default function Pagination (props) {
  const { gotoPrevPage, gotoNextPage, disablePrev, disableNext } = props
  return (
    <div>
      <button onClick={gotoPrevPage} disabled={disablePrev}>Prev</button>
      <button onClick={gotoNextPage} disabled={disableNext}>Next</button>
    </div>
  )
}
