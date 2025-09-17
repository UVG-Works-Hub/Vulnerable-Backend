const { error } = require('console')
const pool = require('../../db')
const queries = require('./queries')
const { response } = require('express')
const { parse } = require('path')
const { NOMEM } = require('dns')


const getMedicos = (req, res) => {
    pool.query(queries.getMedicos, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getMedicosByLugarid = (req, res) => {
    const lugarid = req.params.lugarid

    pool.query(queries.getMedicosByLugarid, [lugarid], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getMedicoByNum = (req, res) => {
    const numero_colegiado = req.params.numero_colegiado

    pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const addMedico = (req, res) => {
    const nombre = req.params.one
    const apellido = req.params.two
    const direccion = req.params.three
    const telefono = req.params.four
    const numero_colegiado = req.params.five
    const especialidad = req.params.six
    const lugarid = req.params.seven

    // verificar si ya existe el numero de colegiado
    pool.query(queries.checkNumColExists, [numero_colegiado], (error, results) => {

        if (results.rows.length) {
            res.send("Ya han registrado este numero de colegiado")
        }

        // agregar medico a base de datos
        pool.query(queries.addMedico, [nombre, apellido, direccion, telefono, numero_colegiado, especialidad, lugarid], (error, results) => {
            if (error) throw error
            res.status(201).send("Medico agregado existosamente")
        })
    })
}

const updateMedicoNombre = (req, res) => {
    const numero_colegiado = req.params.numero_colegiado
    const nombre = req.params.nombre

    pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
        const noExisteMedico = !results.rows.length
        if (noExisteMedico) {
            res.send("El medico no existe")
        }

        pool.query(queries.updateMedicoNombre, [nombre, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Medico actualizado exitosamente")
        })
    })
}

const updateMedicoApellido = (req, res) => {
    const numero_colegiado = req.params.numero_colegiado
    const apellido = req.params.apellido

    pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
        const noExisteMedico = !results.rows.length
        if (noExisteMedico) {
            res.send("El medico no existe")
        }

        pool.query(queries.updateMedicoApellido, [apellido, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Medico actualizado exitosamente")
        })
    })
}

const updateMedicoDireccion = (req, res) => {
    const numero_colegiado = req.params.numero_colegiado
    const direccion = req.params.direccion

    pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
        const noExisteMedico = !results.rows.length
        if (noExisteMedico) {
            res.send("El medico no existe")
        }

        pool.query(queries.updateMedicoDireccion, [direccion, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Medico actualizado exitosamente")
        })
    })
}

const updateMedicoTelefono = (req, res) => {
    const numero_colegiado = req.params.numero_colegiado
    const telefono = req.params.telefono

    pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
        const noExisteMedico = !results.rows.length
        if (noExisteMedico) {
            res.send("El medico no existe")
        }

        pool.query(queries.updateMedicoTelefono, [telefono, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Medico actualizado exitosamente")
        })
    })
}

const updateMedicoEspecialidad = (req, res) => {
    const numero_colegiado = req.params.numero_colegiado
    const especialidad = req.params.especialidad

    pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
        const noExisteMedico = !results.rows.length
        if (noExisteMedico) {
            res.send("El medico no existe")
        }

        pool.query(queries.updateMedicoEspecialidad, [especialidad, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Medico actualizado exitosamente")
        })
    })
}

const updateMedicoLugarId = (req, res) => {
    const numero_colegiado = req.params.numero_colegiado
    const lugarid = req.params.lugarid

    pool.query(queries.getMedicoByNum, [numero_colegiado], (error, results) => {
        const noExisteMedico = !results.rows.length
        if (noExisteMedico) {
            res.send("El medico no existe")
        }

        pool.query(queries.updateMedicoLugarId, [lugarid, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Medico actualizado exitosamente")
        })
    })
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