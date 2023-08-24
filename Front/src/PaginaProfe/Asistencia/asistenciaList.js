import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

const AlumnosList = () => {
  const [anios, setAnios] = useState([]);
  const [selectedAnio, setSelectedAnio] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAnios();
  }, []);

  const fetchAnios = async () => {
    try {
      const response = await fetch('http://localhost:3000/curso/anios');
      const data = await response.json();
      setAnios(data);
    } catch (error) {
      console.error('Error fetching años:', error);
    }
  };

  const fetchAlumnosPorAnio = async (anio) => {
    try {
      const response = await fetch(`http://localhost:3000/alumno/por-anio/${anio}`);
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error(`Error fetching alumnos del año ${anio}:`, error);
    }
  };

  const handleAnioChange = async (event) => {
    const selectedAnio = event.target.value;
    setSelectedAnio(selectedAnio);

    // Limpia los datos de asistencia
    setAttendanceData([]);
    setAlumnos([]); // Vaciar la lista de alumnos
    if (selectedAnio) {
      await fetchAlumnosPorAnio(selectedAnio);
    }
  };

  const handleAttendanceChange = (alumnoId, asistenciaType) => {
    setAttendanceData((prevData) => {
      const fecha = new Date().toISOString();
      const alumno = alumnos.find((alumno) => alumno.idAlumno === alumnoId);

      // Filtra los datos anteriores y actualiza con los nuevos valores
      const updatedData = prevData.filter((item) => item.id !== alumnoId);

      // Solo añade asistencia si el checkbox está tildado
      if (asistenciaType) {
        return [
          ...updatedData,
          { id: alumnoId, alumno: alumno.nombre, fecha, asistencia: asistenciaType }
        ];
      } else {
        return updatedData; // No se agrega asistencia si el checkbox no está marcado
      }
    });
  };

  const saveAttendance = async () => {
    console.log('Guardando asistencias...');
    if (attendanceData.length === 0) {
      console.log('No hay asistencias seleccionadas para guardar.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/asistencia', { asistencias: attendanceData });
      console.log('Asistencias guardadas');

      // Mostrar un alert y limpiar los datos de asistencia
      alert('Asistencias guardadas');
      setAttendanceData([]);

      // Vaciar la lista de alumnos
      setAlumnos([]);
    } catch (error) {
      console.error('Error al guardar asistencias:', error);
    }
  };

  return (
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
      <ListGroup>
        {alumnos.map((alumno) => (
          <ListGroup.Item key={alumno.idAlumno} className="d-flex justify-content-between align-items-center">
            <span>{alumno.nombre}</span>
            <div>
              <input
                type="radio"
                name={`asistencia_${alumno.idAlumno}`}
                value="presente"
                onChange={() => handleAttendanceChange(alumno.idAlumno, 'presente')}
              /> Presente
              <input
                type="radio"
                name={`asistencia_${alumno.idAlumno}`}
                value="ausente"
                onChange={() => handleAttendanceChange(alumno.idAlumno, 'ausente')}
              /> Ausente
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
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <Button variant="primary" onClick={saveAttendance}>
          Guardar Asistencias
        </Button>
      </div>
    </div>
  );
};

export default AlumnosList;
