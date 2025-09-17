const getPacientes = 'SELECT * FROM pacientes ORDER BY paciente_id';
const getPacienteId = 'SELECT paciente_id FROM pacientes WHERE dpi = $1'
const getPacienteByDpi= "SELECT * FROM pacientes WHERE dpi = $1";
const checkPacienteExists= "SELECT nombre FROM pacientes WHERE dpi= $1";
const addPaciente = "INSERT INTO pacientes (nombre, apellido, telefono, direccion, masa_corporal, altura, peso, adicciones,evoluciones,status,dpi) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11)"
const updatePacienteNombre= "UPDATE pacientes SET nombre = $1 WHERE dpi = $2";
const updatePacienteApellido = "UPDATE pacientes SET apellido = $1 WHERE dpi = $2";
const updatePacienteTelefono = "UPDATE pacientes SET telefono = $1 WHERE dpi = $2";
const updatePacienteDireccion = "UPDATE pacientes SET direccion = $1 WHERE dpi = $2";
const updatePacienteMasa = "UPDATE pacientes SET masa_corporal = $1 WHERE dpi = $2";
const updatePacienteAltura = "UPDATE pacientes SET altura = $1 WHERE dpi = $2";
const updatePacientePeso = "UPDATE pacientes SET peso= $1 WHERE dpi = $2";
const updatePacienteAdicciones = "UPDATE pacientes SET adicciones = $1 WHERE dpi = $2";
const updatePacientEvoluciones = "UPDATE pacientes SET evoluciones = $1 WHERE dpi = $2";
const updatePacienteEstatus = "UPDATE pacientes SET status = $1 WHERE dpi = $2";

module.exports ={
    getPacientes, getPacienteId, getPacienteByDpi, addPaciente, checkPacienteExists, updatePacienteNombre, 
    updatePacienteApellido, updatePacienteTelefono,updatePacienteDireccion,updatePacienteMasa,
    updatePacienteAltura, updatePacientePeso, updatePacienteAdicciones, updatePacientEvoluciones, updatePacienteEstatus,
}