const { Router } = require('express')
const controller = require('./controller.prisma')

const router = Router()

// Rutas para visitas con Prisma
router.get('/', controller.getVisitas)
router.get('/:id', controller.getVisitaById)
router.get('/paciente/:pacienteId', controller.getVisitasByPacienteId)

// Rutas específicas por DPI del paciente
router.get('/examenes/:dpi', controller.getExamenesByDPI)
router.get('/cirugias/:dpi', controller.getCirugiasByDPI)
router.get('/medicos/:dpi', controller.getMedicosOfPaciente)
router.get('/medicamentos/:dpi', controller.getMedicamentosYEvolucion)
router.get('/lugares/:dpi', controller.getLugaresVisitados)
router.get('/detalles/:dpi', controller.getVisitasEspecificas)

router.post('/', controller.addVisita)
router.put('/:id', controller.updateVisita)
router.delete('/:id', controller.deleteVisita)

module.exports = router
