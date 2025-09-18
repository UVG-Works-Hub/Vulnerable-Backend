const { error } = require('console')
const pool = require('../../db')
const queries = require('./queries')
const { response } = require('express')
const { parse } = require('path')
const { NOMEM } = require('dns')

const getVisitas = (req,res)=>{
    try {
        pool.query(queries.getVisitas,(error,results) =>{
            if (error) {
                console.error('Error in getVisitas:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows);
        })
    } catch (error) {
        console.error('Unexpected error in getVisitas:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getVisitasBypacienteID = (req,res) => {
    try {
        const pacienteid = req.params.pacienteid

        if (!pacienteid) {
            return res.status(400).json({ error: 'Bad request', details: 'pacienteid parameter is required' });
        }

        pool.query(queries. getVisitasBypacienteID, [pacienteid], (error, results) => {
            if (error) {
                console.error('Error in getVisitasBypacienteID:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getVisitasBypacienteID:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getExamenesByDPI = (req,res) => {
    try {
        const dpi = req.params.dpi

        if (!dpi) {
            return res.status(400).json({ error: 'Bad request', details: 'dpi parameter is required' });
        }

        pool.query(queries. getExamenesByDPI, [dpi], (error, results) => {
            if (error) {
                console.error('Error in getExamenesByDPI:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getExamenesByDPI:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getCirugiasByDPI = (req,res) => {
    try {
        const dpi = req.params.dpi

        if (!dpi) {
            return res.status(400).json({ error: 'Bad request', details: 'dpi parameter is required' });
        }

        pool.query(queries. getCirugiasByDPI, [dpi], (error, results) => {
            if (error) {
                console.error('Error in getCirugiasByDPI:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getCirugiasByDPI:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getMedicosOfPaciente = (req,res) => {
    try {
        const dpi = req.params.dpi

        if (!dpi) {
            return res.status(400).json({ error: 'Bad request', details: 'dpi parameter is required' });
        }

        pool.query(queries. getMedicosOfPaciente, [dpi], (error, results) => {
            if (error) {
                console.error('Error in getMedicosOfPaciente:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getMedicosOfPaciente:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
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