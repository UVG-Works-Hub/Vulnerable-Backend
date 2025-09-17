const { Router } = require('express')
const controller = require('./controller')

const router = Router()

router.get("/", controller.getMedicos)
router.get("/by_lugarid/:lugarid", controller.getMedicosByLugarid)
router.get("/:numero_colegiado", controller.getMedicoByNum)

router.post("/:one&:two&:three&:four&:five&:six&:seven", controller.addMedico)

router.put("/cambiar_nombre/:numero_colegiado&:nombre", controller.updateMedicoNombre)
router.put("/cambiar_apellido/:numero_colegiado&:apellido", controller.updateMedicoApellido)
router.put("/cambiar_direccion/:numero_colegiado&:direccion", controller.updateMedicoDireccion)
router.put("/cambiar_telefono/:numero_colegiado&:telefono", controller.updateMedicoTelefono)
router.put("/cambiar_especialidad/:numero_colegiado&:especialidad", controller.updateMedicoEspecialidad)
router.put("/cambiar_lugarid/:numero_colegiado&:lugarid", controller.updateMedicoLugarId)

module.exports = router