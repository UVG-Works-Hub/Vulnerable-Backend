const { Router } = require('express');
const controller = require('./controller');

const router = Router()

router.get('/get_pacientesvisitas/', controller.getNombreMedicos);
router.get('/enfermedades_mortales/', controller.getTopEnfermedades);
router.get('/reporte_mensual/:lugarid', controller.getreporteMensual);
router.get('/top_hospitales/', controller.getTopHospitales);
router.get('/top_medicos/', controller.getTopMedicos);


module.exports = router;