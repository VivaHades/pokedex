import { Row, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import PokemonCard from '../PokemonCard/PokemonCard'
import './CardBoard.styl'
export default function CardBoard (props) {
  const { filterText, pokemons } = props
  const [filterPokemons, setFilterPokemons] = useState([])

  useEffect(() => {
    setFilterPokemons(filterText
      ? pokemons.filter(p => p.name.includes(filterText))
      : pokemons)
  }, [filterText, JSON.stringify(pokemons)]
  )

  return (
    <div className='CardBoard'>
    <Row className='row' gutter={[10, 10]} justify='start' wrap={true}>
      {filterPokemons.map(p => 
        <Col
          key={p.name}
          xs={24}
          sm={12}
          md={8}
          lg={6}
          >
          <PokemonCard pokemon={p} />
        </Col>)
      }
    </Row>
    </div>
  )
}
