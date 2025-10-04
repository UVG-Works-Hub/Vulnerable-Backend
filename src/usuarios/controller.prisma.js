const prisma = require('../prisma')
const bcrypt = require('bcrypt')

// Obtener usuarios por lugar ID y tipo médico
const getUsuariosByLugarId = async (req, res) => {
  try {
    const { lugarId } = req.params

    const usuarios = await prisma.usuarios.findMany({
      where: {
        lugar_id: parseInt(lugarId),
        tipo: 'medico'
      },
      orderBy: { user_id: 'asc' }
    })

    res.json(usuarios)
  } catch (error) {
    console.error('Error getting usuarios by lugar ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener usuario por número de colegiado
const getUsuarioByNumeroColegiado = async (req, res) => {
  try {
    const { numeroColegiado } = req.params

    const usuario = await prisma.usuarios.findUnique({
      where: { numero_colegiado: numeroColegiado }
    })

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json(usuario)
  } catch (error) {
    console.error('Error getting usuario by numero colegiado:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener lugar ID del médico por número de colegiado
const getLugarIdByNumeroColegiado = async (req, res) => {
  try {
    const { numeroColegiado } = req.params

    const medico = await prisma.medicos.findUnique({
      where: { numero_colegiado: numeroColegiado },
      select: { lugar_id: true }
    })

    if (!medico) {
      return res.status(404).json({ error: 'Médico no encontrado' })
    }

    res.json({ lugar_id: medico.lugar_id })
  } catch (error) {
    console.error('Error getting lugar ID by numero colegiado:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Crear nuevo usuario médico
const addUsuario = async (req, res) => {
  try {
    const {
      correo,
      contrasena,
      numero_colegiado,
      lugar_id
    } = req.body

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds)

    const usuario = await prisma.usuarios.create({
      data: {
        tipo: 'medico',
        correo,
        contrasena: hashedPassword,
        numero_colegiado,
        lugar_id: parseInt(lugar_id)
      }
    })

    res.status(201).json(usuario)
  } catch (error) {
    console.error('Error adding usuario:', error)

    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Correo o número de colegiado ya existe' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar correo del usuario
const updateUsuarioCorreo = async (req, res) => {
  try {
    const { numeroColegiado } = req.params
    const { correo } = req.body

    const usuario = await prisma.usuarios.update({
      where: { numero_colegiado: numeroColegiado },
      data: { correo: correo }
    })

    res.json(usuario)
  } catch (error) {
    console.error('Error updating usuario correo:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Usuario no encontrado' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ error: 'Correo ya existe' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar contraseña del usuario
const updateUsuarioContrasena = async (req, res) => {
  try {
    const { numeroColegiado } = req.params
    const { contrasena } = req.body

    // Hash the new password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds)

    const usuario = await prisma.usuarios.update({
      where: { numero_colegiado: numeroColegiado },
      data: { contrasena: hashedPassword }
    })

    res.json({ message: 'Contraseña actualizada exitosamente' })
  } catch (error) {
    console.error('Error updating usuario contraseña:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Usuario no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar número de colegiado del usuario
const updateUsuarioNumeroColegiado = async (req, res) => {
  try {
    const { currentNumeroColegiado } = req.params
    const { nuevoNumeroColegiado } = req.body

    const usuario = await prisma.usuarios.update({
      where: { numero_colegiado: currentNumeroColegiado },
      data: { numero_colegiado: nuevoNumeroColegiado }
    })

    res.json(usuario)
  } catch (error) {
    console.error('Error updating usuario numero colegiado:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Usuario no encontrado' })
    } else if (error.code === 'P2002') {
      res.status(400).json({ error: 'Número de colegiado ya existe' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar lugar ID del usuario
const updateUsuarioLugarId = async (req, res) => {
  try {
    const { numeroColegiado } = req.params
    const { lugar_id } = req.body

    const usuario = await prisma.usuarios.update({
      where: { numero_colegiado: numeroColegiado },
      data: { lugar_id: parseInt(lugar_id) }
    })

    res.json(usuario)
  } catch (error) {
    console.error('Error updating usuario lugar ID:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Usuario no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Eliminar usuario
const deleteUsuario = async (req, res) => {
  try {
    const { numeroColegiado } = req.params

    const usuario = await prisma.usuarios.delete({
      where: { numero_colegiado: numeroColegiado }
    })

    res.json({ message: 'Usuario eliminado exitosamente', usuario })
  } catch (error) {
    console.error('Error deleting usuario:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Usuario no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = {
  getUsuariosByLugarId,
  getUsuarioByNumeroColegiado,
  getLugarIdByNumeroColegiado,
  addUsuario,
  updateUsuarioCorreo,
  updateUsuarioContrasena,
  updateUsuarioNumeroColegiado,
  updateUsuarioLugarId,
  deleteUsuario,
}
