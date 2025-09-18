const { error } = require('console')
const pool = require('../../db')
const queries = require('./queries')
const { response } = require('express')
const { parse } = require('path')
const { NOMEM } = require('dns')

const getNombreMedicos = (req, res) => {
    try {
        pool.query(queries.getNombreMedicos, (error, results) => {
            if (error) {
                console.error('Error in getNombreMedicos:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getNombreMedicos:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getTopEnfermedades = (req, res) => {
    try {
        pool.query(queries.getTopEnfermedades, (error, results) => {
            if (error) {
                console.error('Error in getTopEnfermedades:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getTopEnfermedades:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getreporteMensual = (req, res) => {
    try {
        const lugarid = req.params.lugarid
        console.log("Lugar ID:", lugarid)

        if (!lugarid) {
            return res.status(400).json({ error: 'Bad request', details: 'lugarid parameter is required' });
        }

        pool.query(queries.getreporteMensual, [lugarid], (error, results) => {
            if (error) {
                console.error('Error in getreporteMensual:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getreporteMensual:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getTopHospitales = (req, res) => {
    try {
        pool.query(queries.getTopHospitales, (error, results) => {
            if (error) {
                console.error('Error in getTopHospitales:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getTopHospitales:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getTopMedicos = (req, res) => {
    try {
        pool.query(queries.getTopMedicos, (error, results) => {
            if (error) {
                console.error('Error in getTopMedicos:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getTopMedicos:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}




module.exports ={
    getNombreMedicos, getTopEnfermedades, getreporteMensual, getTopHospitales, getTopMedicos,
}