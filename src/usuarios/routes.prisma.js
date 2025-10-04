const { Router } = require('express')
const controller = require('./controller.prisma')

const router = Router()

// Rutas para usuarios con Prisma
router.get('/lugar/:lugarId', controller.getUsuariosByLugarId)
router.get('/colegiado/:numeroColegiado', controller.getUsuarioByNumeroColegiado)
router.get('/lugarid/:numeroColegiado', controller.getLugarIdByNumeroColegiado)

router.post('/', controller.addUsuario)

router.put('/correo/:numeroColegiado', controller.updateUsuarioCorreo)
router.put('/contrasena/:numeroColegiado', controller.updateUsuarioContrasena)
router.put('/colegiado/:currentNumeroColegiado', controller.updateUsuarioNumeroColegiado)
router.put('/lugar/:numeroColegiado', controller.updateUsuarioLugarId)

router.delete('/:numeroColegiado', controller.deleteUsuario)

module.exports = router
