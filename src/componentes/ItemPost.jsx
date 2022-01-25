import React from 'react';

export function ItemPost({posit, cambiarImportancia, eliminarPosit}) {
    const {id, titulo, descripcion, importante} = posit;

    const fnCambiaImportancia = () => {
        cambiarImportancia(id);
    }

    const fnEliminarPosit = () => {
        eliminarPosit(id);
    }

    // prepara css
    // si es importante lo pinta de otro color
    let css=null;
    if (posit.importante)
        css = "card mb-3 postit importante";
    else
        css = "card mb-3 postit normal";

    // si el id comienza con un numero lo gira a la derecha, sino a la izquierda
    if (posit.id.charCodeAt(0) > 47 && posit.id.charCodeAt(0) < 58 )
        css += " giroderecha";
    else
        css += " giroizquierda";

    return (
        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
            <div className={css}>
                <h5 className="card-title input-group">
                {/* <input type="checkbox" className="form-check-input me-2"
                    checked={importante} onChange={fnCambiaImportancia}></input> */}
                    <button className="btn ms-1" onClick={fnCambiaImportancia}><i class="bi bi-exclamation-square"></i></button>
                    <p id="titulo" className="form-control border-0 bg-transparent">{titulo}</p>
                    <button className="btn ms-1" onClick={fnEliminarPosit}><i class="bi bi-x-square"></i></button>
                </h5>
            
                <p class="card-text">{descripcion}</p>
            </div>
        </div>
    );
}