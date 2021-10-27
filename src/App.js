import React, {useState, useEffect} from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  const [presupuesto, setPresupuesto] = useState(0);
  const [restante, setRestante] = useState(0);
  const [mostrarPregunta, setMostrarPregunta] = useState(true)
  const [gastos, setGastos] = useState([]);
  const [gasto, setGasto] = useState({});
  const [guardarGasto, setGuardarGasto] = useState(false);

  //useEffect que se activa cunado se haga un restante al presupuesto
  useEffect(() => {
    if (guardarGasto) {
      //Agrega el nuevo presupuesto
      setGastos([
        ...gastos,
        gasto
      ])
      //resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      setRestante(presupuestoRestante);

      setGuardarGasto(false);
    }
  }, [gasto, gastos, guardarGasto, restante]);

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        
        <div className="contenido-principal contenido">
          {mostrarPregunta ? (
            <Pregunta 
              setPresupuesto={setPresupuesto}
              setRestante={setRestante}
              setMostrarPregunta={setMostrarPregunta}
            />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario setGasto={setGasto} setGuardarGasto={setGuardarGasto}/>
              </div>
              <div className="one-half column">
                <Listado gastos={gastos}/>
                <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                />
              </div>
            </div>
          )}
          
        </div>
      </header>
    </div>
  );
}

export default App;
