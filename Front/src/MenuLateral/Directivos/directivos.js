import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './directivos.css';
import axios from 'axios';
import SideMenu from '../sideMenu';

const Directivos = () => {
  const [textoDirectora, setTextoDirectora] = useState('');
  const [textoSecretaria, setTextoSecretaria] = useState('');
  const [textoRepresentante, setTextoRepresentante] = useState('');
  const [imagenDirectora, setImagenDirectora] = useState(null);
  const [imagenSecretaria, setImagenSecretaria] = useState(null);
  const [imagenRepresentante, setImagenRepresentante] = useState(null);

  useEffect(() => {
    const obtenerTextoEImagenPorReferencia = async (referencia, setTexto, setImagen) => {
      try {
        const responseTexto = await axios.get(`https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/carga/${referencia}`);
        setTexto(responseTexto.data.texto);

        const responseImagen = await axios.get(`https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/imagenes/nombre/${referencia}`);

        if (responseImagen.data) {
        
          setImagen(responseImagen.data.url);
        }
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };

    // Obtener texto e imagen por referencia para cada directivo
    obtenerTextoEImagenPorReferencia('directora', setTextoDirectora, setImagenDirectora);
    obtenerTextoEImagenPorReferencia('secretaria', setTextoSecretaria, setImagenSecretaria);
    obtenerTextoEImagenPorReferencia('representante', setTextoRepresentante, setImagenRepresentante);
  }, []);

  return (
    <div>
    <div className="row">
    <div className="col-md-3 col-sm-6 col-xs-12">
    <SideMenu />
</div>
      <div className="col-md-9 mt-5 flex-column align-items-center justify-content-center">   
      <h1 className='titulo-directivos text-top align-items-left'>Nuestro Equipo de Trabajo</h1>
      <div className="row align-items-center justify-content-center">
        <div className="col-md-8 ">
          <div className="directivos ">
            <div className="cuadro-imagen">
              {imagenDirectora && <img src={imagenDirectora} alt="foto de la directora" />}
            </div>
            <h3 className='nombre-directivos'>{textoDirectora}</h3>
            <h5 className='nombre-directivos'>Director de La Institución</h5>
            <div className="cuadro-imagen">
              {imagenSecretaria && <img src={imagenSecretaria} alt="foto de la secretaria" />}
            </div>
            <h3 className='nombre-directivos'>{textoSecretaria}</h3>
            <h5 className='nombre-directivos'>Secretario de La Institución</h5>
            <div className="cuadro-imagen">
              {imagenRepresentante && <img src={imagenRepresentante} alt="foto del representante" />}
            </div>
            <h3 className='nombre-directivos'>{textoRepresentante}</h3>
            <h5 className='nombre-directivos'>Representante Legal de La Institución</h5>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Directivos;
