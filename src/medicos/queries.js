const getMedicos = "SELECT * FROM medicos ORDER BY medico_id ASC"
const getMedicosByLugarid = "SELECT * FROM medicos WHERE lugar_id = $1 ORDER BY medico_id ASC"
const getMedicoByNum = "SELECT * FROM medicos WHERE numero_colegiado = $1"
const checkNumColExists = "SELECT nombre FROM medicos WHERE numero_colegiado = $1"
const addMedico = "INSERT INTO medicos (nombre, apellido, direccion, telefono, numero_colegiado, especialidad, lugar_id) VALUES ($1, $2, $3, $4, $5, $6, $7)"
const updateMedicoNombre = "UPDATE medicos SET nombre = $1 WHERE numero_colegiado = $2"
const updateMedicoApellido = "UPDATE medicos SET apellido = $1 WHERE numero_colegiado = $2"
const updateMedicoDireccion = "UPDATE medicos SET direccion = $1 WHERE numero_colegiado = $2"
const updateMedicoTelefono = "UPDATE medicos SET telefono = $1 WHERE numero_colegiado = $2"
const updateMedicoEspecialidad = "UPDATE medicos SET especialidad = $1 WHERE numero_colegiado = $2"
const updateMedicoLugarId = "UPDATE medicos SET lugar_id = $1 WHERE numero_colegiado = $2"

module.exports = {
    getMedicos,
    getMedicosByLugarid,
    getMedicoByNum,
    checkNumColExists,
    addMedico,
    updateMedicoNombre,
    updateMedicoApellido,
    updateMedicoDireccion,
    updateMedicoTelefono,
    updateMedicoEspecialidad,
    updateMedicoLugarId,
}