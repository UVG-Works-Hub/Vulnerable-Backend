const { error } = require('console')
const pool = require('../../db')
const queries = require('./queries')
const { response } = require('express')
const { parse } = require('path')
const { NOMEM } = require('dns')


const getMedicos = (req, res) => {
    try {
        pool.query(queries.getMedicos, (error, results) => {
            if (error) {
                console.error('Error in getMedicos:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getMedicos:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getMedicosByLugarid = (req, res) => {
    try {
        const lugarid = req.params.lugarid

        if (!lugarid) {
            return res.status(400).json({ error: 'Bad request', details: 'lugarid parameter is required' });
        }

        pool.query(queries.getMedicosByLugarid, [lugarid], (error, results) => {
            if (error) {
                console.error('Error in getMedicosByLugarid:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getMedicosByLugarid:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getMedicoByNum = (req, res) => {
    try {
        const numero_colegiado = req.params.numero_colegiado

        if (!numero_colegiado) {
            return res.status(400).json({ error: 'Bad request', details: 'numero_colegiado parameter is required' });
        }

        pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error in getMedicoByNum:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getMedicoByNum:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const addMedico = (req, res) => {
    try {
        const nombre = req.params.one
        const apellido = req.params.two
        const direccion = req.params.three
        const telefono = req.params.four
        const numero_colegiado = req.params.five
        const especialidad = req.params.six
        const lugarid = req.params.seven

        // Validate required parameters
        if (!nombre || !apellido || !numero_colegiado) {
            return res.status(400).json({ error: 'Bad request', details: 'nombre, apellido, and numero_colegiado are required' });
        }

        // verificar si ya existe el numero de colegiado
        pool.query(queries.checkNumColExists, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking numero_colegiado exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            if (results.rows.length) {
                return res.status(409).json({ error: 'Conflict', details: 'Ya han registrado este numero de colegiado' });
            }

            // agregar medico a base de datos
            pool.query(queries.addMedico, [nombre, apellido, direccion, telefono, numero_colegiado, especialidad, lugarid], (error, results) => {
                if (error) {
                    console.error('Error adding medico:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(201).json({ message: 'Medico agregado existosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in addMedico:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateMedicoNombre = (req, res) => {
    try {
        const numero_colegiado = req.params.numero_colegiado
        const nombre = req.params.nombre

        if (!numero_colegiado || !nombre) {
            return res.status(400).json({ error: 'Bad request', details: 'numero_colegiado and nombre are required' });
        }

        pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking medico exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteMedico = !results.rows.length
            if (noExisteMedico) {
                return res.status(404).json({ error: 'Not found', details: 'El medico no existe' });
            }

            pool.query(queries.updateMedicoNombre, [nombre, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating medico nombre:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Medico actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateMedicoNombre:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateMedicoApellido = (req, res) => {
    try {
        const numero_colegiado = req.params.numero_colegiado
        const apellido = req.params.apellido

        if (!numero_colegiado || !apellido) {
            return res.status(400).json({ error: 'Bad request', details: 'numero_colegiado and apellido are required' });
        }

        pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking medico exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteMedico = !results.rows.length
            if (noExisteMedico) {
                return res.status(404).json({ error: 'Not found', details: 'El medico no existe' });
            }

            pool.query(queries.updateMedicoApellido, [apellido, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating medico apellido:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Medico actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateMedicoApellido:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateMedicoDireccion = (req, res) => {
    try {
        const numero_colegiado = req.params.numero_colegiado
        const direccion = req.params.direccion

        if (!numero_colegiado || !direccion) {
            return res.status(400).json({ error: 'Bad request', details: 'numero_colegiado and direccion are required' });
        }

        pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking medico exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteMedico = !results.rows.length
            if (noExisteMedico) {
                return res.status(404).json({ error: 'Not found', details: 'El medico no existe' });
            }

            pool.query(queries.updateMedicoDireccion, [direccion, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating medico direccion:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Medico actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateMedicoDireccion:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateMedicoTelefono = (req, res) => {
    try {
        const numero_colegiado = req.params.numero_colegiado
        const telefono = req.params.telefono

        if (!numero_colegiado || !telefono) {
            return res.status(400).json({ error: 'Bad request', details: 'numero_colegiado and telefono are required' });
        }

        pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking medico exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteMedico = !results.rows.length
            if (noExisteMedico) {
                return res.status(404).json({ error: 'Not found', details: 'El medico no existe' });
            }

            pool.query(queries.updateMedicoTelefono, [telefono, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating medico telefono:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Medico actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateMedicoTelefono:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateMedicoEspecialidad = (req, res) => {
    try {
        const numero_colegiado = req.params.numero_colegiado
        const especialidad = req.params.especialidad

        if (!numero_colegiado || !especialidad) {
            return res.status(400).json({ error: 'Bad request', details: 'numero_colegiado and especialidad are required' });
        }

        pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking medico exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteMedico = !results.rows.length
            if (noExisteMedico) {
                return res.status(404).json({ error: 'Not found', details: 'El medico no existe' });
            }

            pool.query(queries.updateMedicoEspecialidad, [especialidad, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating medico especialidad:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Medico actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateMedicoEspecialidad:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateMedicoLugarId = (req, res) => {
    try {
        const numero_colegiado = req.params.numero_colegiado
        const lugarid = req.params.lugarid

        if (!numero_colegiado || !lugarid) {
            return res.status(400).json({ error: 'Bad request', details: 'numero_colegiado and lugarid are required' });
        }

        pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking medico exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteMedico = !results.rows.length
            if (noExisteMedico) {
                return res.status(404).json({ error: 'Not found', details: 'El medico no existe' });
            }

            pool.query(queries.updateMedicoLugarId, [lugarid, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating medico lugar_id:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Medico actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateMedicoLugarId:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

module.exports = {
    getMedicos,
    getMedicosByLugarid,
    getMedicoByNum,
    addMedico,
    updateMedicoNombre,
    updateMedicoApellido,
    updateMedicoDireccion,
    updateMedicoTelefono,
    updateMedicoEspecialidad,
    updateMedicoLugarId,
}