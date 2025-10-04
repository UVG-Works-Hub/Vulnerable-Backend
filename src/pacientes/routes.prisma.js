const { Router } = require('express')
const controller = require('./controller.prisma')

const router = Router()

// Rutas para pacientes con Prisma
router.get('/', controller.getPacientes)
router.get('/:dpi', controller.getPacienteByDPI)
router.get('/id/:id', controller.getPacienteById)
router.get('/check/:dpi', controller.checkPacienteExists)

router.post('/', controller.addPaciente)

router.put('/nombre/:dpi', controller.updatePacienteNombre)
router.put('/apellido/:dpi', controller.updatePacienteApellido)
router.put('/telefono/:dpi', controller.updatePacienteTelefono)
router.put('/direccion/:dpi', controller.updatePacienteDireccion)
router.put('/masa-corporal/:dpi', controller.updatePacienteMasaCorporal)
router.put('/altura/:dpi', controller.updatePacienteAltura)
router.put('/peso/:dpi', controller.updatePacientePeso)
router.put('/adicciones/:dpi', controller.updatePacienteAdicciones)
router.put('/evolucion/:dpi', controller.updatePacienteEvolucion)
router.put('/status/:dpi', controller.updatePacienteStatus)

router.delete('/:dpi', controller.deletePaciente)

module.exports = router
