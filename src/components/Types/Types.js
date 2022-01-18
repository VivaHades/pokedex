import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Types.styl'

export default function Types (props) {
  const { selectedTypes, setSelectedTypes } = props
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get('https://pokeapi.co/api/v2/type').then(res => {
      setLoading(false)
      setTypes(res.data.results)
    })
  }, [JSON.stringify(types)]
  )

  function selectType (name) {
    setSelectedTypes({ ...selectedTypes, [name]: !selectedTypes[name] })
  }

  if (loading) return 'Loading...'

  return (
    <div className='resetWrapper'>
    <div className='typesSet'>
      { !loading && types.length
        ? types.map(type =>
          <button
            className={type.name}
            key={type.name}
            onClick={() => selectType(type.name)}>
            {type.name}
          </button>)
        : null
      }
      
    </div>
    <button className='resetButton' onClick={() => setSelectedTypes({})}> Reset </button>
    </div>
  )
}
