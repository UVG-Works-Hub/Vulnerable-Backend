const prisma = require('../prisma')

// Obtener todas las visitas
const getVisitas = async (req, res) => {
  try {
    const visitas = await prisma.visitas.findMany({
      include: {
        paciente: true,
        medico: true,
        lugar: true,
        enfermedad: true
      },
      orderBy: { visita_id: 'asc' }
    })
    res.json(visitas)
  } catch (error) {
    console.error('Error getting visitas:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener visita por ID
const getVisitaById = async (req, res) => {
  try {
    const { id } = req.params

    const visita = await prisma.visitas.findUnique({
      where: { visita_id: parseInt(id) },
      include: {
        paciente: true,
        medico: true,
        lugar: true,
        enfermedad: true
      }
    })

    if (!visita) {
      return res.status(404).json({ error: 'Visita no encontrada' })
    }

    res.json(visita)
  } catch (error) {
    console.error('Error getting visita by ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener visitas por paciente ID
const getVisitasByPacienteId = async (req, res) => {
  try {
    const { pacienteId } = req.params

    const visitas = await prisma.visitas.findMany({
      where: { paciente_id: parseInt(pacienteId) },
      include: {
        paciente: true,
        medico: true,
        lugar: true,
        enfermedad: true
      },
      orderBy: { fecha: 'desc' }
    })

    res.json(visitas)
  } catch (error) {
    console.error('Error getting visitas by paciente ID:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener exámenes por DPI del paciente
const getExamenesByDPI = async (req, res) => {
  try {
    const { dpi } = req.params

    const examenes = await prisma.visitas.findMany({
      where: {
        paciente: { dpi: dpi }
      },
      select: {
        fecha: true,
        examen: true
      },
      orderBy: { fecha: 'desc' }
    })

    res.json(examenes)
  } catch (error) {
    console.error('Error getting examenes by DPI:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener cirugías por DPI del paciente
const getCirugiasByDPI = async (req, res) => {
  try {
    const { dpi } = req.params

    const cirugias = await prisma.cirugias.findMany({
      where: {
        paciente: { dpi: dpi }
      },
      include: {
        medico: true,
        paciente: true
      },
      orderBy: { fecha_hora: 'desc' }
    })

    res.json(cirugias)
  } catch (error) {
    console.error('Error getting cirugias by DPI:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener médicos que trataron a un paciente
const getMedicosOfPaciente = async (req, res) => {
  try {
    const { dpi } = req.params

    const medicos = await prisma.medicos.findMany({
      where: {
        cirugias: {
          some: {
            paciente: { dpi: dpi }
          }
        }
      },
      select: {
        nombre: true,
        apellido: true,
        numero_colegiado: true,
        especialidad: true
      }
    })

    res.json(medicos)
  } catch (error) {
    console.error('Error getting medicos of paciente:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener medicamentos y evolución por DPI del paciente
const getMedicamentosYEvolucion = async (req, res) => {
  try {
    const { dpi } = req.params

    const medicamentos = await prisma.visitas.findMany({
      where: {
        paciente: { dpi: dpi }
      },
      select: {
        fecha: true,
        medicamentos: true,
        evolucion: true
      },
      orderBy: { fecha: 'desc' }
    })

    res.json(medicamentos)
  } catch (error) {
    console.error('Error getting medicamentos y evolucion by DPI:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener lugares visitados por DPI del paciente
const getLugaresVisitados = async (req, res) => {
  try {
    const { dpi } = req.params

    const lugares = await prisma.lugares.findMany({
      where: {
        visitas: {
          some: {
            paciente: { dpi: dpi }
          }
        }
      },
      select: {
        nombre: true,
        visitas: {
          where: {
            paciente: { dpi: dpi }
          },
          select: {
            fecha: true,
            hora: true
          },
          orderBy: { fecha: 'desc' }
        }
      }
    })

    res.json(lugares)
  } catch (error) {
    console.error('Error getting lugares visitados by DPI:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Obtener visitas específicas con detalles completos
const getVisitasEspecificas = async (req, res) => {
  try {
    const { dpi } = req.params

    const visitas = await prisma.visitas.findMany({
      where: {
        paciente: { dpi: dpi }
      },
      include: {
        paciente: {
          select: { nombre: true }
        },
        lugar: {
          select: { nombre: true }
        },
        medico: {
          select: { nombre: true }
        },
        enfermedad: {
          select: { nombre: true }
        }
      },
      orderBy: { fecha: 'desc' }
    })

    res.json(visitas)
  } catch (error) {
    console.error('Error getting visitas especificas by DPI:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Crear nueva visita
const addVisita = async (req, res) => {
  try {
    const {
      paciente_id,
      fecha,
      hora,
      lugar_id,
      medico_id,
      examen,
      enfermedad_id,
      medicamentos,
      evolucion
    } = req.body

    const visita = await prisma.visitas.create({
      data: {
        paciente_id: parseInt(paciente_id),
        fecha: new Date(fecha),
        hora,
        lugar_id: parseInt(lugar_id),
        medico_id: parseInt(medico_id),
        examen,
        enfermedad_id: enfermedad_id ? parseInt(enfermedad_id) : null,
        medicamentos,
        evolucion
      }
    })

    res.status(201).json(visita)
  } catch (error) {
    console.error('Error adding visita:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Actualizar visita
const updateVisita = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Convertir fechas si están presentes
    if (updateData.fecha) {
      updateData.fecha = new Date(updateData.fecha)
    }

    // Convertir IDs a números enteros si están presentes
    if (updateData.paciente_id) {
      updateData.paciente_id = parseInt(updateData.paciente_id)
    }
    if (updateData.lugar_id) {
      updateData.lugar_id = parseInt(updateData.lugar_id)
    }
    if (updateData.medico_id) {
      updateData.medico_id = parseInt(updateData.medico_id)
    }
    if (updateData.enfermedad_id) {
      updateData.enfermedad_id = parseInt(updateData.enfermedad_id)
    }

    const visita = await prisma.visitas.update({
      where: { visita_id: parseInt(id) },
      data: updateData,
      include: {
        paciente: true,
        medico: true,
        lugar: true,
        enfermedad: true
      }
    })

    res.json(visita)
  } catch (error) {
    console.error('Error updating visita:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Visita no encontrada' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

// Eliminar visita
const deleteVisita = async (req, res) => {
  try {
    const { id } = req.params

    const visita = await prisma.visitas.delete({
      where: { visita_id: parseInt(id) }
    })

    res.json({ message: 'Visita eliminada exitosamente', visita })
  } catch (error) {
    console.error('Error deleting visita:', error)

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Visita no encontrada' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = {
  getVisitas,
  getVisitaById,
  getVisitasByPacienteId,
  getExamenesByDPI,
  getCirugiasByDPI,
  getMedicosOfPaciente,
  getMedicamentosYEvolucion,
  getLugaresVisitados,
  getVisitasEspecificas,
  addVisita,
  updateVisita,
  deleteVisita,
}
