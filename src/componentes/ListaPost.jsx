import React, { useState, useRef, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { ItemPost } from './ItemPost';
import { v4 as uuid } from 'uuid';

const KEY = "lista-postit";

export function ListaPost() {

    const [posits, setPosits] = useState(
        [
            // {id:1, titulo:"titulo 1", descripcion:"descripcion del posit 1", importante:true}
            // ,{id:2, titulo:"titulo 2", descripcion:"descripcion del posit 2", importante:false}
            // ,{id:3, titulo:"titulo 3", descripcion:"descripcion del posit 3", importante:false}
            // ,{id:4, titulo:"titulo 4", descripcion:"descripcion del posit 4", importante:true}
            // ,{id:5, titulo:"titulo 5", descripcion:"descripcion del posit 5", importante:false}
            // ,{id:6, titulo:"titulo 6", descripcion:"descripcion del posit 6", importante:true}
        ]
    );

    const tituRef = useRef();
    const textoRef = useRef();
    const impoRef = useRef();

    useEffect(() => {
        const storePosit = JSON.parse(localStorage.getItem(KEY));
        if (storePosit) {
            setPosits(storePosit);
        }
    },[]);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(posits));
    },[posits]);

    const cambiaImportanciaPosit = (id) => {
        const copiaPosits = [...posits];
        const posit = copiaPosits.find((posit) => posit.id === id);
        posit.importante = !posit.importante;
        setPosits(copiaPosits);
    }

    const eliminaPositGrupo = (id) => {
        const copiaPosits = posits.filter((posit) => posit.id !== id);
        setPosits(copiaPosits);
    }

    const agregarPosit = () => {
        const titu = tituRef.current.value;
        const texto = textoRef.current.value;
        const impo = impoRef.current.checked;

        if (texto === '') return;

        setPosits((oldPosits) => {
            const newPosit = {
                id: uuid(),
                titulo: titu,
                descripcion: texto,
                importante: impo
            }
            return [...oldPosits, newPosit]
        })
        tituRef.current.value = null;
        textoRef.current.value = null;
        impoRef.current.checked = false;
    }

    return (
        <Fragment>
            <h3>Post-It Simulator</h3>

            {/* interfaz para agregar cards */}

            <div className="input-group mt-4 mb-4">
                <input ref={tituRef} type="text" placeholder="Título" className="form-control me-2"maxlength="20" ></input>
                <input type="text" placeholder="Descripción" className="form-control me-2" ref={textoRef}></input>
                <label className="textoBlanco">
                    <input type="checkbox" className="form-check-input me-2" ref={impoRef}></input>
                    Importante
                </label>
                <button className="btn btn-dark ms-4 col-3" onClick={agregarPosit}>Agregar</button>
            </div>

            {/* despliegue de cards */}
            <div className="row">
                {
                    posits.map( (posit) => (
                        <ItemPost posit={posit} key={posit.id}
                            cambiarImportancia={cambiaImportanciaPosit}
                            eliminarPosit={eliminaPositGrupo}
                        >
                        </ItemPost>
                    ) 
                    )
                }
            </div>
        </Fragment>
    );
}