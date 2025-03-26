import React from 'react'
import NoBox from './NoBox'
import End from './End'

export default function Intermediario({ volume, sfx }) {
  return (
    <>
      {localStorage.getItem('d1d1-no') === 'completed' ? (
        <End volume={volume} sfx={sfx} />
      ) : (
        <NoBox volume={volume} sfx={sfx} />
      )}
    </>
  )
}
