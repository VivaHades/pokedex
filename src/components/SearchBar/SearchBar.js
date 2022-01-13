import React from 'react'
import './SearchBar.styl'

export default function SearchBar (props) {
  const { filterText } = props

  function handleFilterTextChange (e) {
    props.onFilterTextChange(e.target.value)
  }

  return (
    <nav>
      <input className='SearchBar'
        type='text'
        placeholder='Search...'
        value={filterText}
        onChange={handleFilterTextChange}
      />
    </nav>
  )
}
