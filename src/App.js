import React, { useState, useEffect } from 'react'
import CardBoard from './components/CardBoard/CardBoard'
import axios from 'axios'
import SearchBar from './components/SearchBar/SearchBar'
import Types from './components/Types/Types'
import { Pagination } from 'antd'
import _ from 'lodash'
import './App.css'

function App () {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

  const [pokemons, setPokemons] = useState([])
  const [count, setCount] = useState()
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [selectedTypes, setSelectedTypes] = useState({})

  useEffect(() => {
    setLoading(true)
    if (checkTypes()) {
      filterByTypes(page, limit)
    } else {
      axios.get(baseUrl + `?offset=${(page - 1) * limit}&limit=${limit}`
      ).then(res => {
        setLoading(false)
        setPokemons(res.data.results)
        setCount(res.data.count)
      })
    }
  }, [limit, page, count, selectedTypes])

  function checkTypes () {
    for (const i in selectedTypes) {
      if (i) return true
    }
    return false
  }

  async function filterByTypes (page, limit) {
    const urls = []
    for (const i in selectedTypes) {
      if (selectedTypes[i]) {
        urls.push(axios.get(`https://pokeapi.co/api/v2/type/${i}`))
      }
    }
    const filteredPokemons = await Promise.all(urls)

    const flattenFilteredPokemons =
    _.flatten(filteredPokemons.map(d => d.data.pokemon))

    const uniqueFilteredPokemons =
    _.uniqBy(flattenFilteredPokemons,
      (p) => p.pokemon.name).map(p => p.pokemon)
    setCount(uniqueFilteredPokemons.length)
    setLoading(false)
    setPokemons(uniqueFilteredPokemons.slice(page * limit, page * limit + limit))
  }

  function handleFilterTextChange (searchValue) {
    setSearchValue(searchValue)
  }

  if (loading) return 'loading...'

  return (
    <div className='App'>
      <header className='Header'>
        <div className="Wrapper">
          <SearchBar
            filterText={searchValue}
            onFilterTextChange={handleFilterTextChange}
          />
          <Types
            setSelectedTypes={setSelectedTypes}
            selectedTypes={selectedTypes}
          />
        </div>
      </header>
      { !loading && pokemons.length
        ? (<CardBoard className='CardBoard' pokemons={pokemons} filterText={searchValue}/>)
        : null
      }
      <Pagination className='Pagination'
        current={page}
        pageSize={limit}
        pageSizeOptions={[10, 20, 50]}
        showSizeChanger={true}
        onChange={(page, limit) => {
          setPage(page)
          setLimit(limit)
        }}
        total={count}
        responsive={true}
      />
    </div>
  )
}
export default App
