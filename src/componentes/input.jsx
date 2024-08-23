import React from 'react'

export default function input(params) {
    const {Nome, Id, TipoInput, ...rest} = params;
  return (
    <div className="mt-3">
        <label htmlFor={Id} className="form-label" >{Nome}</label>

      <input className="form-control" type={TipoInput} {...rest}/>
    </div>
  )
}
