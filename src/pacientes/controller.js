const { error } = require('console')
const pool = require('../../db')
const queries = require('./queries')
const { response } = require('express')
const { parse } = require('path')
const { NOMEM } = require('dns')


const getPacientes = (req,res)=>{
    pool.query(queries.getPacientes,(error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);

    })
}
const getPacienteByDPI = (req,res) => {
    const dpi = req.params.dpi

    pool.query(queries. getPacienteByDpi, [dpi], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getPacienteId = (req,res) => {
    const dpi = req.params.dpi

    pool.query(queries. getPacienteId, [dpi], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}


const addPaciente = (req, res) => {
    const nombre = req.params.one
    const apellido = req.params.two
    const telefono = req.params.three
    const direccion = req.params.four
    const masa_corporal = parseFloat(req.params.five)
    const altura = parseInt(req.params.six)
    const peso = parseFloat(req.params.seven)
    const adicciones = req.params.eight
    const evoluciones = req.params.nine
    const status = req.params.ten
    const dpi = req.params.eleven

    // verificar si ya existe el numero de colegiado
    pool.query(queries.checkPacienteExists, [dpi], (error, results) => {

        if (results.rows.length) {
            res.send("Ya han registrado este numero de colegiado")
        }

        // agregar medico a base de datos
        pool.query(queries.addPaciente, [ nombre, apellido, telefono, direccion, masa_corporal, altura, peso, adicciones,evoluciones,status,dpi], (error, results) => {
            if (error) throw error
            res.status(201).send("Paciente agregado existosamente")
        })
    })
}

const updatePacienteNombre = (req, res) => {
    const dpi = req.params.dpi
    const nombre = req.params.nombre
    pool.query(queries. getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }
        pool.query(queries.updatePacienteNombre, [nombre, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}

const updatePacienteApellido = (req, res) => {
    const dpi = req.params.dpi
    const apellido = req.params.apellido

    pool.query(queries. getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }

        pool.query(queries.updatePacienteApellido, [apellido, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}

const updatePacienteTelefono = (req, res) => {
    const dpi = req.params.dpi
    const telefono = req.params.telefono

    pool.query(queries.getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }

        pool.query(queries.updatePacienteTelefono, [telefono, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}
const updatePacienteDireccion = (req, res) => {
    const dpi = req.params.dpi
    const direccion = req.params.direccion

    pool.query(queries.getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }

        pool.query(queries.updatePacienteDireccion, [direccion, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}

const updatePacienteMasa = (req, res) => {
    const dpi = req.params.dpi
    const masa = parseFloat(req.params.masa_corporal)

    pool.query(queries.getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }

        pool.query(queries.updatePacienteMasa, [masa, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}

const updatePacienteAltura= (req, res) => {
    const dpi = req.params.dpi
    const altura = parseInt(req.params.altura)
    console.log(dpi)
    console.log(altura)

    pool.query(queries.getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }
        console.log("paso")
        pool.query(queries.updatePacienteAltura, [altura, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}

const updatePacientePeso= (req, res) => {
    const dpi = req.params.dpi
    const peso = parseFloat(req.params.peso)

    pool.query(queries.getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }

        pool.query(queries.updatePacientePeso, [peso, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}
const updatePacienteAdicciones= (req, res) => {
    const dpi = req.params.dpi
    const adicciones = req.params.adicciones

    pool.query(queries.getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }

        pool.query(queries.updatePacienteAdicciones, [adicciones, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}
const updatePacienteEvoluciones= (req, res) => {
    const dpi = req.params.dpi
    const evoluciones = req.params.evoluciones

    pool.query(queries.getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }

        pool.query(queries.updatePacientEvoluciones, [evoluciones, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}
const updatePacienteEstatus= (req, res) => {
    const dpi = req.params.dpi
    const estatus = req.params.estatus

    pool.query(queries.getPacienteByDpi, [dpi], (error, results) => {
        const noExistePaciente = !results.rows.length
        if (noExistePaciente) {
            res.send("El paciente no existe")
        }

        pool.query(queries.updatePacienteEstatus, [estatus, dpi], (error, results) => {
            if (error) throw error
            res.status(200).send("Paciente actualizado exitosamente")
        })
    })
}


module.exports ={
    getPacientes, getPacienteByDPI, getPacienteId, addPaciente, updatePacienteNombre, updatePacienteApellido,
     updatePacienteTelefono, updatePacienteDireccion, updatePacienteMasa, updatePacienteAltura,
      updatePacientePeso, updatePacienteAdicciones, updatePacienteEvoluciones, updatePacienteEstatus,
}