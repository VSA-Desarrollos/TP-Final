import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../InicioSesion/tokenContext';

const AsistenciaList = () => {
  const [anios, setAnios] = useState([]);
  const [selectedAnio, setSelectedAnio] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [error, setError] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const { token } = useAuth();


  useEffect(() => {
    fetchAnios();
  }, []);

  const fetchAnios = async () => {
    try {
      const response = await fetch('https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/curso/anios');
      const data = await response.json();
      setAnios(data);
    } catch (error) {
      console.error('Error fetching anios:', error);
    }
  };

  const fetchAlumnosPorAnio = async (anio) => {
    try {
      const response = await fetch(`https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/alumno/por-anio/${anio}`);
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error(`Error fetching alumnos del anio ${anio}:`, error);
    }
  };

  const handleAnioChange = async (event) => {
    const selectedAnio = event.target.value;
    setSelectedAnio(selectedAnio);

    setAttendanceData([]);
    setAlumnos([]);
    if (selectedAnio) {
      await fetchAlumnosPorAnio(selectedAnio);
    }
  };

  const handleAttendanceChange = (alumnoId, asistenciaType) => {
    setAttendanceData((prevData) => {
      const fecha = new Date().toISOString().split('T')[0];

      const updatedData = prevData.filter((item) => item.id !== alumnoId);

      const alumno = alumnos.find((alumno) => alumno.idAlumno === alumnoId);
      console.log(alumno)
      if (asistenciaType) {
        return [
          ...updatedData,
          {
            id: alumnoId,
            idAlumno: alumno.idAlumno,
            nombre: alumno.nombre,
            anio: alumno.cursoIdCurso.anio,
            fecha,
            asistencia: asistenciaType,
          },
        ];
      } else {
        return updatedData;
      }
    });
  };

  const saveAttendance = async () => {
    console.log('Guardando asistencias...');
    if (attendanceData.length === 0) {
      console.log('No hay asistencias seleccionadas para guardar.');
      setError('No hay asistencias seleccionadas para guardar.');
      setTimeout(() => {
        setError(null);
      }, 2000); // 2000 milisegundos (2 segundos)
      return;
    }

    try {
      console.log(attendanceData)
      await axios.post('https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/asistencia', attendanceData, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Asistencias guardadas');

      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(null);
      }, 2000); // 2000 milisegundos (2 segundos)
      setAttendanceData([]);
      setAlumnos([]);
      setSelectedAnio('');
    } catch (error) {

      console.error('Error al guardar asistencias:', error);
      setError('Error al guardar asistencias. Verifica tu conexión o inténtalo más tarde.');
      setTimeout(() => {
        setError(null);
      }, 2000); // 2000 milisegundos (2 segundos)

      // Verificar si la respuesta indica que la sesión ha expirado
      if (error.response && error.response.status === 401) {
        setSessionExpired(true);
      }
    }
  };

  return (
    <div className="col-9 mx-auto mt-5">
      {sessionExpired ? (
        <Alert className="alert alert-danger">
          Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
        </Alert>
      ) : (
        <div>
          <h2>Registro de asistencia</h2>
          <Form className="text-center mb-3">
            <Form.Group controlId="formAnio" className="mx-auto" style={{ maxWidth: '200px' }}>
              <Form.Label>Seleccionar Año</Form.Label>
              <Form.Control as="select" onChange={handleAnioChange} value={selectedAnio}>
                <option value="">Seleccione un año</option>
                {anios.map((anio) => (
                  <option key={anio} value={anio}>
                    {anio}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <h2 className="text-center">Alumnos de {selectedAnio}</h2>
          <ListGroup className="d-flex flex-wrap justify-content-center">
            {alumnos.map((alumno) => (
              <ListGroup.Item key={alumno.idAlumno} className="d-flex justify-content-around align-items-center">
                <span>{alumno.nombre}</span>
                <div>
                  <input
                    type="radio"
                    name={`asistencia_${alumno.idAlumno}`}
                    value="presente"
                    onChange={() => handleAttendanceChange(alumno.idAlumno, 'presente')}
                  /> Presente
                  <span className="mx-2"></span>
                  <input
                    type="radio"
                    name={`asistencia_${alumno.idAlumno}`}
                    value="ausente"
                    onChange={() => handleAttendanceChange(alumno.idAlumno, 'ausente')}
                  /> Ausente
                  <span className="mx-2"></span>
                  <input
                    type="radio"
                    name={`asistencia_${alumno.idAlumno}`}
                    value="media-falta"
                    onChange={() => handleAttendanceChange(alumno.idAlumno, 'media-falta')}
                  /> Media Falta
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <Button variant="primary" onClick={saveAttendance}>
              Guardar Asistencias
            </Button>
          </div>
          {showSuccessAlert && (
            <Alert variant="success" className="mt-3 text-center">
              Asistencias guardadas exitosamente.
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3 text-center">
              {error}
            </Alert>
          )}

        </div>
      )}
    </div>
  );
}
export default AsistenciaList;