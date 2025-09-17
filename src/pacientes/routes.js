const { Router } = require('express');
const controller = require('./controller');

const router = Router()

router.get('/', controller.getPacientes);
router.get('/:dpi', controller.getPacienteByDPI);
router.get('/getid/:dpi', controller.getPacienteId);


router.post("/:one&:two&:three&:four&:five&:six&:seven&:eight&:nine&:ten&:eleven", controller.addPaciente);

router.put("/cambiar_nombre/:dpi&:nombre", controller.updatePacienteNombre);
router.put("/cambiar_apellido/:dpi&:apellido", controller.updatePacienteApellido);
router.put("/cambiar_telefono/:dpi&:telefono", controller.updatePacienteTelefono);
router.put("/cambiar_direccion/:dpi&:direccion", controller.updatePacienteDireccion);
router.put("/cambiar_masa_corporal/:dpi&:masa_corporal", controller.updatePacienteMasa);
router.put("/cambiar_altura/:dpi&:altura", controller.updatePacienteAltura);
router.put("/cambiar_peso/:dpi&:peso", controller.updatePacientePeso);
router.put("/cambiar_adicciones/:dpi&:adicciones", controller.updatePacienteAdicciones);
router.put("/cambiar_evoluciones/:dpi&:evoluciones", controller.updatePacienteEvoluciones);
router.put("/cambiar_estatus/:dpi&:estatus", controller.updatePacienteEstatus);

module.exports = router;