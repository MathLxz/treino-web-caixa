import React from 'react'

export default function button({Nome, onClick}) {
    
  return (
    <div className='mt-3'>
      <button type="button" className='btn btn-success' onClick={onClick}> {Nome} </button>
    </div>
  )
}
