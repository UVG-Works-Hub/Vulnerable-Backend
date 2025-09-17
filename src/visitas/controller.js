const { error } = require('console')
const pool = require('../../db')
const queries = require('./queries')
const { response } = require('express')
const { parse } = require('path')
const { NOMEM } = require('dns')

const getVisitas = (req,res)=>{
    pool.query(queries.getVisitas,(error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);

    })
}

const getVisitasBypacienteID = (req,res) => {
    const pacienteid = req.params.pacienteid

    pool.query(queries. getVisitasBypacienteID, [pacienteid], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getExamenesByDPI = (req,res) => {
    const dpi = req.params.dpi

    pool.query(queries. getExamenesByDPI, [dpi], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getCirugiasByDPI = (req,res) => {
    const dpi = req.params.dpi

    pool.query(queries. getCirugiasByDPI, [dpi], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getMedicosOfPaciente = (req,res) => {
    const dpi = req.params.dpi

    pool.query(queries. getMedicosOfPaciente, [dpi], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getLugaresVisitados = (req,res) => {
    const dpi = req.params.dpi

    pool.query(queries. getLugaresVisitados, [dpi], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getMedicamentosYEvolucion = (req,res) => {
    const dpi = req.params.dpi

    pool.query(queries.getMedicamentosYEvolucion, [dpi], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getVisitasEspecificas = (req,res) => {
    const dpi = req.params.dpi

    pool.query(queries.getVisitasEspecificas, [dpi], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const addVisita = (req, res) => {
    const { visitaid, pacienteid, fecha, hora, lugarid, medicoid, examen,enfermedadid,medicamentos,evolucion } = req.body

    // verificar si ya existe el numero de colegiado
    pool.query(queries.checkVisitaExists, [pacienteid], (error, results) => {

        if (results.rows.length) {
            res.send("Ya han registrado este numero de colegiado")
        }

        // agregar medico a base de datos
        pool.query(queries.addVisita, [ visitaid, pacienteid, fecha, hora, lugarid, medicoid, examen,enfermedadid,medicamentos,evolucion], (error, results) => {
            if (error) throw error
            res.status(201).send("Paciente agregado existosamente")
        })
    })
}


module.exports ={
    getVisitas, getVisitasBypacienteID, addVisita, getExamenesByDPI, getCirugiasByDPI, getMedicosOfPaciente, getMedicamentosYEvolucion, getLugaresVisitados, getVisitasEspecificas
}