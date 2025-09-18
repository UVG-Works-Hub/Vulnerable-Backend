const getTipoyLugarid = "SELECT tipo FROM usuarios WHERE correo = $1 AND contrasena = $2"
const getByNum = "SELECT * FROM usuarios WHERE numero_colegiado = $1"
const getUsuarios = "SELECT * FROM Usuarios ORDER BY user_id ASC"
const getUsuarioLugarid = "SELECT lugar_id FROM medicos WHERE numero_colegiado = $1"
const getUsuariosByLugarid = "SELECT * FROM Usuarios WHERE lugar_id = $1 AND tipo = 'medico' ORDER BY user_id ASC"
const addUsuario = "INSERT INTO usuarios (tipo, correo, contrasena, numero_colegiado, lugar_id) VALUES ('medico', $1, $2, $3, $4)"
const updateCorreo = "UPDATE usuarios SET correo = $1 WHERE numero_colegiado = $2"
const updateContraseña = "UPDATE usuarios SET contrasena = $1 WHERE numero_colegiado = $2"
const updateNum = "UPDATE usuarios SET numero_colegiado = $1 WHERE numero_colegiado = $2"
const updateLugarid = "UPDATE usuarios SET lugar_id = $1 WHERE numero_colegiado = $2"

module.exports = {
    getTipoyLugarid,
    getByNum,
    getUsuarioLugarid,
    getUsuarios,
    getUsuariosByLugarid,
    addUsuario,
    updateCorreo,
    updateContraseña,
    updateNum,
    updateLugarid,
}