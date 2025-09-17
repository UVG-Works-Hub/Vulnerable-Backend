const { error } = require('console')
const pool = require('../../db')
const queries = require('./queries')
const { response } = require('express')
const { parse } = require('path')
const { NOMEM } = require('dns')


const getTipoyLugarid = (req, res) => {
    const correo = req.params.one
    const contraseña = req.params.two

    pool.query(queries.getTipoyLugarid, [correo, contraseña], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getUsuarios = (req, res) => {

    pool.query(queries.getUsuarios, (error, results) => {
        
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getUsuariosLugarid = (req, res) => {
    const num_colegiado = req.params.num

    pool.query(queries.getUsuarioLugarid, [num_colegiado], (error, results) => {
        
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getUsuariosByLugarid = (req, res) => {
    const lugarid = req.params.lugarid

    pool.query(queries.getUsuariosByLugarid, [lugarid], (error, results) => {
        
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const addUsuarios = (req, res) => {
    const correo = req.params.one
    const contraseña = req.params.two
    const num_colegiado = req.params.three
    const lugarid = req.params.four

    pool.query(queries.getByNum, [num_colegiado], (error, results) => {

        if (results.rows.length) {
            res.send("Ya han registrado con este numero de colegiado")
        }

        pool.query(queries.addUsuario, [correo, contraseña, num_colegiado, lugarid], (error, results) => {
            if (error) throw error
            res.status(201).send("Usuarios registrado existosamente")
        })
    })
}

const updateCorreo = (req, res) => {
    const correo = req.params.one
    const numero_colegiado = req.params.two

    pool.query(queries.getByNum, [numero_colegiado], (error, results) => {
        const noExisteUsuario = !results.rows.length
        if (noExisteUsuario) {
            res.send("El usuario no existe")
        }

        pool.query(queries.updateCorreo, [correo, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Usuario actualizado exitosamente")
        })
    })
}

const updateContraseña = (req, res) => {
    const contraseña = req.params.one
    const numero_colegiado = req.params.two

    pool.query(queries.getByNum, [numero_colegiado], (error, results) => {
        const noExisteUsuario = !results.rows.length
        if (noExisteUsuario) {
            res.send("El usuario no existe")
        }

        pool.query(queries.updateContraseña, [contraseña, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Usuario actualizado exitosamente")
        })
    })
}

const updateNum = (req, res) => {
    const nuevo = req.params.one
    const numero_colegiado = req.params.two

    pool.query(queries.getByNum, [numero_colegiado], (error, results) => {
        const noExisteUsuario = !results.rows.length
        if (noExisteUsuario) {
            res.send("El usuario no existe")
        }

        pool.query(queries.updateNum, [nuevo, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Usuario actualizado exitosamente")
        })
    })
}

const updateLugarid = (req, res) => {
    const lugarid = parseInt(req.params.one)
    const numero_colegiado = req.params.two

    pool.query(queries.getByNum, [numero_colegiado], (error, results) => {
        const noExisteUsuario = !results.rows.length
        if (noExisteUsuario) {
            res.send("El usuario no existe")
        }

        pool.query(queries.updateLugarid, [lugarid, numero_colegiado], (error, results) => {
            if (error) throw error
            res.status(200).send("Usuario actualizado exitosamente")
        })
    })
}

module.exports = {
    getTipoyLugarid,
    getUsuarios,
    getUsuariosLugarid,
    getUsuariosByLugarid,
    addUsuarios,
    updateCorreo,
    updateContraseña,
    updateNum,
    updateLugarid,
}