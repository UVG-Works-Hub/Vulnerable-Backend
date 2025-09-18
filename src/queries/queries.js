const getNombreMedicos = "SELECT medicos.nombre , COUNT(*) as num_pacientes FROM medicos JOIN paciente ON medicos.medico_id = paciente.paciente_id GROUP BY medicos.nombre ORDER BY num_pacientes DESC LIMIT 10";
const getTopEnfermedades = "SELECT enfermedades.nombre_enfermedad, COUNT(*) as cantidad FROM enfermedades_paciente JOIN enfermedades ON enfermedades_paciente.enfermedad_id = enfermedades.enfermedad_id GROUP BY enfermedades.nombre_enfermedad ORDER BY cantidad DESC LIMIT 10;";
const getreporteMensual = "SELECT tipo, porcentaje_restante FROM abastecimientos WHERE lugar_id = $1";
const getTopHospitales = "SELECT lugares.nombre, COUNT(*) as total_pacientes FROM paciente INNER JOIN visitas ON paciente.paciente_id = visitas.paciente_id INNER JOIN lugares ON visitas.lugar_id = lugares.lugar_id GROUP BY lugares.nombre ORDER BY total_pacientes DESC LIMIT 10;";
const getTopMedicos = "SELECT m.medico_id, m.nombre AS medico_nombre, COUNT(*) AS total_visitas FROM visitas v INNER JOIN medicos m ON v.medico_id = m.medico_id GROUP BY m.medico_id, m.nombre ORDER BY total_visitas desc LIMIT 10;";

module.exports ={
    getNombreMedicos, getTopEnfermedades,getreporteMensual, getTopHospitales, getTopMedicos,
} 