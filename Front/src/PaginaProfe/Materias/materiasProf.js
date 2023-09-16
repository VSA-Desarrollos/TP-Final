import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUsuario } from '../../usuarioContext';

const MateriasProf = () => {
  const [materiaCursoInputs, setMateriaCursoInputs] = useState(Array(25).fill(''));
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(''); // State to hold the selected curso
  const { usuarioLogueado } = useUsuario();

  useEffect(() => {
    // Initialize cursos when usuarioLogueado changes
    if (usuarioLogueado && usuarioLogueado.curso) {
      const cursoIds = usuarioLogueado.curso.split(',').map((id) => id.trim());
      const cursoTexts = cursoIds.map((id) => convertCursoIdToText(id));
      setCursos(cursoTexts);
    } else {
      // Reset cursos when usuarioLogueado is empty or curso is empty
      setCursos([]);
    }
  }, [usuarioLogueado]);

  const fetchMaterias = async (cursoText) => {
    try {
      const response = await axios.get(`http://localhost:3000/materias-curso/${cursoText}`);
      const materiaCursoData = response.data;

      if (materiaCursoData.length > 0) {
        const updatedMateriaCursoInputs = materiaCursoData.map((materiaItem) => materiaItem.materia || '');
        setMateriaCursoInputs(updatedMateriaCursoInputs);
      } else {
        setMateriaCursoInputs(Array(25).fill(''));
      }
    } catch (error) {
      console.error('Error fetching materia data:', error);
    }
  };

  const renderNonEditableCell = (cellIndex, materia) => {
    return (
      <td key={cellIndex}>
        <div>{materia}</div>
      </td>
    );
  };

  const handleCursoChange = (e) => {
    const selectedCurso = e.target.value;
    setSelectedCurso(selectedCurso);
    fetchMaterias(selectedCurso);
  };

  const horarios = [
    '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00'
  ];

  const convertCursoIdToText = (cursoId) => {
    switch (cursoId) {
      case '1':
        return 'Primero';
      case '2':
        return 'Segundo';
      case '3':
        return 'Tercero';
      case '4':
        return 'Cuarto';
      case '5':
        return 'Quinto';
      case '6':
        return 'Sexto';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <h4 className="mb-4">Aquí podrás ver las materias según los días y horarios</h4>
      <div className="mb-3">
        <label>Seleccione un curso:</label>
        <select className="form-select" onChange={handleCursoChange} value={selectedCurso}>
          <option value="">Seleccione un curso</option>
          {cursos.map((cursoText) => (
            <option key={cursoText} value={cursoText}>
              {cursoText}
            </option>
          ))}
        </select>
      </div>
      <div className="table-responsive mb-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="column-header">Horario</th>
              <th className="column-header">Lunes</th>
              <th className="column-header">Martes</th>
              <th className="column-header">Miércoles</th>
              <th className="column-header">Jueves</th>
              <th className="column-header">Viernes</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((horario, index) => (
              <tr key={index}>
                <td>{horario}</td>
                {renderNonEditableCell(index, materiaCursoInputs[index])}
                {renderNonEditableCell(index + 5, materiaCursoInputs[index + 5])}
                {renderNonEditableCell(index + 10, materiaCursoInputs[index + 10])}
                {renderNonEditableCell(index + 15, materiaCursoInputs[index + 15])}
                {renderNonEditableCell(index + 20, materiaCursoInputs[index + 20])}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MateriasProf;
