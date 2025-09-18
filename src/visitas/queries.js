const getVisitas = 'SELECT * FROM visitas';
const getVisitasById= "SELECT * FROM visitas WHERE visita_id = $1";
const checkVisitaExists= "SELECT visita_id FROM paciente WHERE paciente_id= $1";
const getVisitasBypacienteID = "SELECT * FROM visitas WHERE paciente_id = $1";
const getExamenesByDPI = "SELECT fecha, examen FROM visitas INNER JOIN paciente USING (paciente_id) WHERE dpi = $1"
const getCirugiasByDPI = "SELECT fecha_hora, medicos.nombre, medicos.apellido, procedimiento FROM cirugias INNER JOIN medicos USING (medico_id) INNER JOIN paciente USING(paciente_id) WHERE dpi = $1"
const getMedicosOfPaciente = "SELECT medicos.nombre, medicos.apellido, numero_colegiado, especialidad FROM medicos INNER JOIN cirugias USING (medico_id) INNER JOIN paciente USING (paciente_id) WHERE dpi = $1"
const getMedicamentosYEvolucion = "SELECT fecha, medicamentos, visitas.evolucion FROM visitas INNER JOIN paciente USING(paciente_id) WHERE dpi = $1"
const getLugaresVisitados = "SELECT DISTINCT fecha, hora, lugares.nombre FROM visitas INNER JOIN lugares USING (lugar_id) INNER JOIN paciente USING (paciente_id) WHERE dpi = $1"
const getVisitasEspecificas = "SELECT paciente.nombre, fecha, hora, lugares.nombre AS lugar, medicos.nombre AS medico, examen, nombre_enfermedad, medicamentos, visitas.evolucion FROM visitas INNER JOIN paciente USING (paciente_id) INNER JOIN lugares USING(lugar_id) INNER JOIN medicos USING (medico_id) INNER JOIN enfermedades USING (enfermedad_id) WHERE dpi = $1"
const addVisita = "INSERT INTO visitas (visita_id, paciente_id, fecha, hora, lugar_id, medico_id, examen,enfermedad_id,medicamentos,evolucion) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10)"

module.exports ={
    getVisitas,getVisitasBypacienteID,checkVisitaExists, addVisita, getExamenesByDPI, getCirugiasByDPI, getMedicosOfPaciente, getMedicamentosYEvolucion, getLugaresVisitados, getVisitasEspecificas
}