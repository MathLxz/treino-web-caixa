import React from 'react'

export default function select(params) {
    const { Nome, Id, Opcoes } = params;

    return (
        <div className="mb-3">
            <label htmlFor={Id}
                className="form-label">
                {Nome}
            </label>
            
            <select id={Id}
                value={params.value}
                onChange={params.onChange}
                className="form-select"
                aria-label="Default select example">
                

                <option value=''>Selecione um item</option>
                {Opcoes.map(x => <option value={x.value} key={x.value}>{x.label}</option>)}
            </select>
        </div>
    )
}