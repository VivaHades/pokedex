import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'antd'
import './PokemonCard.styl'
export default function PokemonCard (props) {
  const [pokemon, setPokemon] = useState([])
  const [activeTabKey, setActiveTabKey] = useState('Pokemon')
  const tabList = [
    {
      key: 'Pokemon',
      tab: 'Pokemon'
    },
    {
      key: 'Info',
      tab: 'Info'
    }
  ]
  const contentList = {
    Pokemon:
    (pokemon.sprites &&
    <div className='container'>
      <div className='Image'>
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div>
        <b>Types:</b><br />
          {pokemon.types && pokemon.types.map(t =>
            <button className={t.type.name} key={t.type.name}>
              {t.type.name}
            </button>)}
            <br />
        <b>Abilities</b> <br />
          {pokemon.abilities && pokemon.abilities.map(ability => 
            <i key={ability.ability.name}> {ability.ability.name} <br /></i>
          )}
      </div>
  
    </div>
    ),
    Info:
    <div className='container'>
      <div className='baseChars'>
      <h2>Base characteristics</h2>
        height: {pokemon.height}<br/>
        weight: {pokemon.weight}<br/>
      </div>
      <div className='Stats'>
      <h2>Stats</h2>
        {pokemon.stats && pokemon.stats.map(stat =>
          <p key={stat.stat.name} style={{ margin: '0px' }}>
            <b>{stat.stat.name}</b>: { stat.base_stat}
          </p>
        )}
      </div>
    </div>
  }

  useEffect(() => {
    axios.get(props.pokemon.url).then(res => {
      setPokemon(res.data)
    })
  }, [])

  function onTabChange (key) {
    setActiveTabKey(key)
  }

  return (
    <Card
      style={{ width: '96%', margin: 'auto' }}
      title={pokemon.name}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={key => onTabChange(key)}
    >
    {contentList[activeTabKey]}
    </Card>
  )
}
