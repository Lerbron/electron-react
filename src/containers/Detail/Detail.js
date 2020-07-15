import React from 'react'

export default function Detail({history}) {
  return (
    <div>
      <div onClick={() => history.goBack()}>go back</div>
      Detail Page
    </div>
  )
}