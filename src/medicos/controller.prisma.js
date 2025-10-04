const prisma = require('../prisma')

// Obtener todos los médicos
const getMedicos = async (req, res) => {
  try {
    const medicos = await prisma.medicos.findMany({
      orderBy: { medico_id: 'asc' }
    })
    res.json(medicos)
  } catch (error) {
    console.error('Error getting medicos:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener médicos por lugar ID
const getMedicosByLugarId = async (req, res) => {
  try {
    const { lugarId } = req.params

    const medicos = await prisma.medicos.findMany({
      where: { lugar_id: parseInt(lugarId) },
      orderBy: { medico_id: 'asc' }
    })

    res.json(medicos)
  } catch (error) {
    console.error('Error getting medicos by lugar ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener médico por número de colegiado
const getMedicoByNumeroColegiado = async (req, res) => {
  try {
    const { numeroColegiado } = req.params

    const medico = await prisma.medicos.findUnique({
      where: { numero_colegiado: numeroColegiado }
    })

    if (!medico) {
      return res.status(404).json({ error: 'Médico no encontrado' })
    }

    res.json(medico)
  } catch (error) {
    console.error('Error getting medico by numero colegiado:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Verificar si número de colegiado existe
const checkNumeroColegiadoExists = async (req, res) => {
  try {
    const { numeroColegiado } = req.params

    const medico = await prisma.medicos.findUnique({
      where: { numero_colegiado: numeroColegiado },
      select: { nombre: true }
    })

    if (!medico) {
      return res.status(404).json({ error: 'Número de colegiado no encontrado' })
    }

    res.json({ exists: true, nombre: medico.nombre })
  } catch (error) {
    console.error('Error checking numero colegiado exists:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Crear nuevo médico
const addMedico = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      direccion,
      telefono,
      numero_colegiado,
      especialidad,
      lugar_id
    } = req.body

    const medico = await prisma.medicos.create({
      data: {
        nombre,
        apellido,
        direccion,
        telefono,
        numero_colegiado,
        especialidad,
        lugar_id: parseInt(lugar_id)
      }
    })

    res.status(201).json(medico)
  } catch (error) {
    console.error('Error adding medico:', error)

    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Número de colegiado ya existe' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar nombre del médico
const updateMedicoNombre = async (req, res) => {
  try {
    const { numeroColegiado } = req.params
    const { nombre } = req.body

    const medico = await prisma.medicos.update({
      where: { numero_colegiado: numeroColegiado },
      data: { nombre: nombre }
    })

    res.json(medico)
  } catch (error) {
    console.error('Error updating medico nombre:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Médico no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar apellido del médico
const updateMedicoApellido = async (req, res) => {
  try {
    const { numeroColegiado } = req.params
    const { apellido } = req.body

    const medico = await prisma.medicos.update({
      where: { numero_colegiado: numeroColegiado },
      data: { apellido: apellido }
    })

    res.json(medico)
  } catch (error) {
    console.error('Error updating medico apellido:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Médico no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar teléfono del médico
const updateMedicoTelefono = async (req, res) => {
  try {
    const { numeroColegiado } = req.params
    const { telefono } = req.body

    const medico = await prisma.medicos.update({
      where: { numero_colegiado: numeroColegiado },
      data: { telefono: telefono }
    })

    res.json(medico)
  } catch (error) {
    console.error('Error updating medico telefono:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Médico no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar teléfono del médico
const updateMedicoDireccion = async (req, res) => {
  try {
    const { numeroColegiado } = req.params
    const { direccion } = req.body

    const medico = await prisma.medicos.update({
      where: { numero_colegiado: numeroColegiado },
      data: { direccion: direccion }
    })

    res.json(medico)
  } catch (error) {
    console.error('Error updating medico direccion:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Médico no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar especialidad del médico
const updateMedicoEspecialidad = async (req, res) => {
  try {
    const { numeroColegiado } = req.params
    const { especialidad } = req.body

    const medico = await prisma.medicos.update({
      where: { numero_colegiado: numeroColegiado },
      data: { especialidad: especialidad }
    })

    res.json(medico)
  } catch (error) {
    console.error('Error updating medico especialidad:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Médico no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar lugar ID del médico
const updateMedicoLugarId = async (req, res) => {
  try {
    const { numeroColegiado } = req.params
    const { lugar_id } = req.body

    const medico = await prisma.medicos.update({
      where: { numero_colegiado: numeroColegiado },
      data: { lugar_id: parseInt(lugar_id) }
    })

    res.json(medico)
  } catch (error) {
    console.error('Error updating medico lugar ID:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Médico no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Eliminar médico
const deleteMedico = async (req, res) => {
  try {
    const { numeroColegiado } = req.params

    const medico = await prisma.medicos.delete({
      where: { numero_colegiado: numeroColegiado }
    })

    res.json({ message: 'Médico eliminado exitosamente', medico })
  } catch (error) {
    console.error('Error deleting medico:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Médico no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = {
  getMedicos,
  getMedicosByLugarId,
  getMedicoByNumeroColegiado,
  checkNumeroColegiadoExists,
  addMedico,
  updateMedicoNombre,
  updateMedicoApellido,
  updateMedicoTelefono,
  updateMedicoDireccion,
  updateMedicoEspecialidad,
  updateMedicoLugarId,
  deleteMedico,
}
