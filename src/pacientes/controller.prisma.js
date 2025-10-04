const prisma = require('../prisma')

// Obtener todos los pacientes
const getPacientes = async (req, res) => {
  try {
    const pacientes = await prisma.paciente.findMany({
      orderBy: { paciente_id: 'asc' }
    })
    res.json(pacientes)
  } catch (error) {
    console.error('Error getting pacientes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener paciente por DPI
const getPacienteByDPI = async (req, res) => {
  try {
    const { dpi } = req.params

    const paciente = await prisma.paciente.findUnique({
      where: { dpi: dpi }
    })

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' })
    }

    res.json(paciente)
  } catch (error) {
    console.error('Error getting paciente by DPI:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener paciente por ID
const getPacienteById = async (req, res) => {
  try {
    const { id } = req.params

    const paciente = await prisma.paciente.findUnique({
      where: { paciente_id: parseInt(id) }
    })

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' })
    }

    res.json(paciente)
  } catch (error) {
    console.error('Error getting paciente by ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Verificar si paciente existe por DPI
const checkPacienteExists = async (req, res) => {
  try {
    const { dpi } = req.params

    const paciente = await prisma.paciente.findUnique({
      where: { dpi: dpi },
      select: { nombre: true }
    })

    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado' })
    }

    res.json({ exists: true, nombre: paciente.nombre })
  } catch (error) {
    console.error('Error checking paciente exists:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Crear nuevo paciente
const addPaciente = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      telefono,
      direccion,
      masa_corporal,
      altura,
      peso,
      adicciones,
      evolucion,
      status,
      dpi
    } = req.body

    const paciente = await prisma.paciente.create({
      data: {
        nombre,
        apellido,
        telefono,
        direccion,
        masa_corporal: parseFloat(masa_corporal),
        altura: parseFloat(altura),
        peso: parseFloat(peso),
        adicciones,
        evolucion,
        status,
        dpi
      }
    })

    res.status(201).json(paciente)
  } catch (error) {
    console.error('Error adding paciente:', error)

    if (error.code === 'P2002') {
      res.status(400).json({ error: 'DPI ya existe' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar nombre del paciente
const updatePacienteNombre = async (req, res) => {
  try {
    const { dpi } = req.params
    const { nombre } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { nombre: nombre }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente nombre:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar apellido del paciente
const updatePacienteApellido = async (req, res) => {
  try {
    const { dpi } = req.params
    const { apellido } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { apellido: apellido }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente apellido:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar teléfono del paciente
const updatePacienteTelefono = async (req, res) => {
  try {
    const { dpi } = req.params
    const { telefono } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { telefono: telefono }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente telefono:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar dirección del paciente
const updatePacienteDireccion = async (req, res) => {
  try {
    const { dpi } = req.params
    const { direccion } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { direccion: direccion }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente direccion:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar masa corporal del paciente
const updatePacienteMasaCorporal = async (req, res) => {
  try {
    const { dpi } = req.params
    const { masa_corporal } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { masa_corporal: parseFloat(masa_corporal) }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente masa corporal:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar altura del paciente
const updatePacienteAltura = async (req, res) => {
  try {
    const { dpi } = req.params
    const { altura } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { altura: parseFloat(altura) }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente altura:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar peso del paciente
const updatePacientePeso = async (req, res) => {
  try {
    const { dpi } = req.params
    const { peso } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { peso: parseFloat(peso) }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente peso:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar adicciones del paciente
const updatePacienteAdicciones = async (req, res) => {
  try {
    const { dpi } = req.params
    const { adicciones } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { adicciones: adicciones }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente adicciones:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar evoluciones del paciente
const updatePacienteEvolucion = async (req, res) => {
  try {
    const { dpi } = req.params
    const { evolucion } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { evolucion: evolucion }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente evolucion:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Actualizar status del paciente
const updatePacienteStatus = async (req, res) => {
  try {
    const { dpi } = req.params
    const { status } = req.body

    const paciente = await prisma.paciente.update({
      where: { dpi: dpi },
      data: { status: status }
    })

    res.json(paciente)
  } catch (error) {
    console.error('Error updating paciente status:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Eliminar paciente
const deletePaciente = async (req, res) => {
  try {
    const { dpi } = req.params

    const paciente = await prisma.paciente.delete({
      where: { dpi: dpi }
    })

    res.json({ message: 'Paciente eliminado exitosamente', paciente })
  } catch (error) {
    console.error('Error deleting paciente:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Paciente no encontrado' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = {
  getPacientes,
  getPacienteByDPI,
  getPacienteById,
  checkPacienteExists,
  addPaciente,
  updatePacienteNombre,
  updatePacienteApellido,
  updatePacienteTelefono,
  updatePacienteDireccion,
  updatePacienteMasaCorporal,
  updatePacienteAltura,
  updatePacientePeso,
  updatePacienteAdicciones,
  updatePacienteEvolucion,
  updatePacienteStatus,
  deletePaciente,
}
