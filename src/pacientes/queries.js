const getPacientes = 'SELECT * FROM paciente ORDER BY paciente_id';
const getPacienteId = 'SELECT paciente_id FROM paciente WHERE dpi = $1'
const getPacienteByDpi= "SELECT * FROM paciente WHERE dpi = $1";
const checkPacienteExists= "SELECT nombre FROM paciente WHERE dpi= $1";
const addPaciente = "INSERT INTO paciente (nombre, apellido, telefono, direccion, masa_corporal, altura, peso, adicciones,evoluciones,status,dpi) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11)"
const updatePacienteNombre= "UPDATE paciente SET nombre = $1 WHERE dpi = $2";
const updatePacienteApellido = "UPDATE paciente SET apellido = $1 WHERE dpi = $2";
const updatePacienteTelefono = "UPDATE paciente SET telefono = $1 WHERE dpi = $2";
const updatePacienteDireccion = "UPDATE paciente SET direccion = $1 WHERE dpi = $2";
const updatePacienteMasa = "UPDATE paciente SET masa_corporal = $1 WHERE dpi = $2";
const updatePacienteAltura = "UPDATE paciente SET altura = $1 WHERE dpi = $2";
const updatePacientePeso = "UPDATE paciente SET peso= $1 WHERE dpi = $2";
const updatePacienteAdicciones = "UPDATE paciente SET adicciones = $1 WHERE dpi = $2";
const updatePacientEvoluciones = "UPDATE paciente SET evoluciones = $1 WHERE dpi = $2";
const updatePacienteEstatus = "UPDATE paciente SET status = $1 WHERE dpi = $2";

module.exports ={
    getPacientes, getPacienteId, getPacienteByDpi, addPaciente, checkPacienteExists, updatePacienteNombre, 
    updatePacienteApellido, updatePacienteTelefono,updatePacienteDireccion,updatePacienteMasa,
    updatePacienteAltura, updatePacientePeso, updatePacienteAdicciones, updatePacientEvoluciones, updatePacienteEstatus,
}