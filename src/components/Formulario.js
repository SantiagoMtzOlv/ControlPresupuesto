import React, {useState} from 'react'
import shortid from 'shortid';
import PropTypes from 'prop-types';
import Error from './Error';

const Formulario = ({setGasto, setGuardarGasto}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState(false);

    //Cuando el usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();

        //Validar
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        //Construir gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //pasar el gasto al componente principal
        setGasto(gasto);
        setGuardarGasto(true);

        //resetear el form
        setNombre("");
        setCantidad(0);
    } 
    return (
        <form onSubmit={agregarGasto}>
            <h2>Agregar tus gastos aquí</h2>
            {error ? <Error mensaje="Ambos campos son obligatorios o Presupuesto incorrecto" /> : null}
            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                    type="number" 
                    name="" 
                    id="" 
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => parseInt(setCantidad(e.target.value))}
                />
            </div>
            <input 
                type="submit" 
                value="Agregar Gasto"
                className="button-primary u-full-width" 
            />
        </form>
    )
}

Formulario.propTypes = {
    setGasto: PropTypes.func.isRequired,
    setGuardarGasto: PropTypes.func.isRequired
}

export default Formulario
