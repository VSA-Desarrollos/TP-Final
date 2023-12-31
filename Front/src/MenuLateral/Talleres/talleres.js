import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './talleres.css';
import axios from 'axios';
import SideMenu from '../sideMenu';

const Talleres = () => {
  const [textoTaller1, setTextoTaller1] = useState('');
  const [textoTaller2, setTextoTaller2] = useState('');
  const [textoTaller3, setTextoTaller3] = useState('');
  const [textoTaller4, setTextoTaller4] = useState('');
  const [textoTaller5, setTextoTaller5] = useState('');
  const [textoTaller6, setTextoTaller6] = useState('');
  const [textoTelefono, setTextoTelefono] = useState('');
  const [imagenTaller1, setImagenTaller1] = useState(null);
  const [imagenTaller2, setImagenTaller2] = useState(null);
  const [imagenTaller3, setImagenTaller3] = useState(null);
  const [imagenTaller4, setImagenTaller4] = useState(null);
  const [imagenTaller5, setImagenTaller5] = useState(null);
  const [imagenTaller6, setImagenTaller6] = useState(null);

  useEffect(() => {
    const obtenerTextoEImagenPorReferencia = async (referencia, setTexto, setImagen) => {
      try {
        const responseTexto = await axios.get(`https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/carga/${referencia}`);
       
        setTexto(responseTexto.data.texto);

        const responseImagen = await axios.get(`https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/imagenes/nombre/${referencia}`);
        console.log(responseImagen.data.url)
        if (responseImagen.data) {
          setImagen(responseImagen.data.url);
        }
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };

    // Obtener texto e imagen por referencia para cada taller
    obtenerTextoEImagenPorReferencia('taller1', setTextoTaller1, setImagenTaller1);
    obtenerTextoEImagenPorReferencia('taller2', setTextoTaller2, setImagenTaller2);
    obtenerTextoEImagenPorReferencia('taller3', setTextoTaller3, setImagenTaller3);
    obtenerTextoEImagenPorReferencia('taller4', setTextoTaller4, setImagenTaller4);
    obtenerTextoEImagenPorReferencia('taller5', setTextoTaller5, setImagenTaller5);
    obtenerTextoEImagenPorReferencia('taller6', setTextoTaller6, setImagenTaller6);
    obtenerTextoEImagenPorReferencia('Contacto_Talleres', setTextoTelefono);
  }, []);

  const titulo = 'Talleres Disponibles en Nuestras Instalaciones';

  return (
    <div>
    <div className="row">
    <div className="col-md-3 col-sm-6 col-xs-12">
    <SideMenu />
</div>
        <div className="col-md-9 mt-5  flex-column  ">   
      <h1 className="titulo-taller  ">{titulo}</h1>
      <div className="mt-4 p-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col taller">
            <div className="img-taller h-100">
              {imagenTaller1 && <img src={imagenTaller1} className="img-taller" alt="..." />}
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller1}</h5>
              </div>
            </div>
          </div>
          <div className="col taller ">
            <div className="img-taller h-100">
              {imagenTaller2 && <img src={imagenTaller2} className="img-taller" alt="..." />}
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller2}</h5>
              </div>
            </div>
          </div>
          <div className="col taller">
            <div className="img-cont-taller h-100">
              {imagenTaller3 && <img src={imagenTaller3} className="img-taller" alt="..." />}
              <div className="card-body-taller">
                <h5 className="card-title text-center">{textoTaller3}</h5>
              </div>
            </div>
          </div>
          <div className="col taller">
            <div className="img-cont-taller h-100">
              {imagenTaller4 && <img src={imagenTaller4} className="img-taller" alt="..." />}
              <div className="card-body-taller">
                <h4 className="card-title text-center">{textoTaller4}</h4>
              </div>
            </div>
          </div>
          <div className="col taller">
            <div className="img-cont-taller h-100">
              {imagenTaller5 && <img src={imagenTaller5} className="img-taller" alt="..." />}
              <div className="card-body-taller">
                <h5 className="card-title text-center">{textoTaller5}</h5>
              </div>
            </div>
          </div>
          <div className="col taller">
            <div className="img-cont-taller h-100">
              {imagenTaller6 && <img src={imagenTaller6} className="img-taller" alt="..." />}
              <div className="card-body-taller">
                <h5 className="card-title text-center">{textoTaller6}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-end rectangulo-llamado rounded">
        <p className="llamado-titulo text-center">Inscribirse llamando al: {textoTelefono}</p>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Talleres;
