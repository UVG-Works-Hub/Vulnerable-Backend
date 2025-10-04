const { Router } = require('express')
const controller = require('./controller.prisma')

const router = Router()

// Rutas para médicos con Prisma
router.get('/', controller.getMedicos)
router.get('/lugar/:lugarId', controller.getMedicosByLugarId)
router.get('/colegiado/:numeroColegiado', controller.getMedicoByNumeroColegiado)
router.get('/check/:numeroColegiado', controller.checkNumeroColegiadoExists)

router.post('/', controller.addMedico)

router.put('/nombre/:numeroColegiado', controller.updateMedicoNombre)
router.put('/apellido/:numeroColegiado', controller.updateMedicoApellido)
router.put('/telefono/:numeroColegiado', controller.updateMedicoTelefono)
router.put('/especialidad/:numeroColegiado', controller.updateMedicoEspecialidad)
router.put('/direccion/:numeroColegiado', controller.updateMedicoDireccion)
router.put('/lugar/:numeroColegiado', controller.updateMedicoLugarId)

router.delete('/:numeroColegiado', controller.deleteMedico)

module.exports = router
