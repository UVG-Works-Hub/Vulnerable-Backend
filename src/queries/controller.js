const { error } = require('console')
const pool = require('../../db')
const queries = require('./queries')
const { response } = require('express')
const { parse } = require('path')
const { NOMEM } = require('dns')

const getNombreMedicos = (req, res) => {
    pool.query(queries.getNombreMedicos, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getTopEnfermedades = (req, res) => {
    pool.query(queries.getTopEnfermedades, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}
const getreporteMensual = (req, res) => {
    const lugarid = req.params.lugarid

    pool.query(queries.getreporteMensual, [lugarid], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getTopHospitales = (req, res) => {
    pool.query(queries.getTopHospitales, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getTopMedicos = (req, res) => {
    pool.query(queries.getTopMedicos, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}




module.exports ={
    getNombreMedicos, getTopEnfermedades, getreporteMensual, getTopHospitales, getTopMedicos,
}