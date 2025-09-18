const { error } = require('console')
const pool = require('../../db')
const queries = require('./queries')
const { response } = require('express')
const { parse } = require('path')
const { NOMEM } = require('dns')


const getTipoyLugarid = (req, res) => {
    try {
        const correo = req.params.one
        const contraseña = req.params.two

        if (!correo || !contraseña) {
            return res.status(400).json({ error: 'Bad request', details: 'correo and contraseña are required' });
        }

        pool.query(queries.getTipoyLugarid, [correo, contraseña], (error, results) => {
            if (error) {
                console.error('Error in getTipoyLugarid:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getTipoyLugarid:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getUsuarios = (req, res) => {
    try {
        pool.query(queries.getUsuarios, (error, results) => {
            if (error) {
                console.error('Error in getUsuarios:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getUsuarios:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getUsuariosLugarid = (req, res) => {
    try {
        const num_colegiado = req.params.num

        if (!num_colegiado) {
            return res.status(400).json({ error: 'Bad request', details: 'num_colegiado parameter is required' });
        }

        pool.query(queries.getUsuarioLugarid, [num_colegiado], (error, results) => {
            if (error) {
                console.error('Error in getUsuariosLugarid:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getUsuariosLugarid:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const getUsuariosByLugarid = (req, res) => {
    try {
        const lugarid = req.params.lugarid

        if (!lugarid) {
            return res.status(400).json({ error: 'Bad request', details: 'lugarid parameter is required' });
        }

        pool.query(queries.getUsuariosByLugarid, [lugarid], (error, results) => {
            if (error) {
                console.error('Error in getUsuariosByLugarid:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.error('Unexpected error in getUsuariosByLugarid:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const addUsuarios = (req, res) => {
    try {
        const correo = req.params.one
        const contraseña = req.params.two
        const num_colegiado = req.params.three
        const lugarid = req.params.four

        if (!correo || !contraseña || !num_colegiado) {
            return res.status(400).json({ error: 'Bad request', details: 'correo, contraseña, and num_colegiado are required' });
        }

        pool.query(queries.getByNum, [num_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking num_colegiado exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            if (results.rows.length) {
                return res.status(409).json({ error: 'Conflict', details: 'Ya han registrado con este numero de colegiado' });
            }

            pool.query(queries.addUsuario, [correo, contraseña, num_colegiado, lugarid], (error, results) => {
                if (error) {
                    console.error('Error adding usuario:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(201).json({ message: 'Usuarios registrado existosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in addUsuarios:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateCorreo = (req, res) => {
    try {
        const correo = req.params.one
        const numero_colegiado = req.params.two

        if (!correo || !numero_colegiado) {
            return res.status(400).json({ error: 'Bad request', details: 'correo and numero_colegiado are required' });
        }

        pool.query(queries.getByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking usuario exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteUsuario = !results.rows.length
            if (noExisteUsuario) {
                return res.status(404).json({ error: 'Not found', details: 'El usuario no existe' });
            }

            pool.query(queries.updateCorreo, [correo, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating correo:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Usuario actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateCorreo:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateContraseña = (req, res) => {
    try {
        const contraseña = req.params.one
        const numero_colegiado = req.params.two

        if (!contraseña || !numero_colegiado) {
            return res.status(400).json({ error: 'Bad request', details: 'contraseña and numero_colegiado are required' });
        }

        pool.query(queries.getByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking usuario exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteUsuario = !results.rows.length
            if (noExisteUsuario) {
                return res.status(404).json({ error: 'Not found', details: 'El usuario no existe' });
            }

            pool.query(queries.updateContraseña, [contraseña, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating contraseña:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Usuario actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateContraseña:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateNum = (req, res) => {
    try {
        const nuevo = req.params.one
        const numero_colegiado = req.params.two

        if (!nuevo || !numero_colegiado) {
            return res.status(400).json({ error: 'Bad request', details: 'nuevo and numero_colegiado are required' });
        }

        pool.query(queries.getByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking usuario exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteUsuario = !results.rows.length
            if (noExisteUsuario) {
                return res.status(404).json({ error: 'Not found', details: 'El usuario no existe' });
            }

            pool.query(queries.updateNum, [nuevo, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating numero_colegiado:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Usuario actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateNum:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}

const updateLugarid = (req, res) => {
    try {
        const lugarid = parseInt(req.params.one)
        const numero_colegiado = req.params.two

        if (!lugarid || !numero_colegiado || isNaN(lugarid)) {
            return res.status(400).json({ error: 'Bad request', details: 'valid lugarid and numero_colegiado are required' });
        }

        pool.query(queries.getByNum, [numero_colegiado], (error, results) => {
            if (error) {
                console.error('Error checking usuario exists:', error);
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }

            const noExisteUsuario = !results.rows.length
            if (noExisteUsuario) {
                return res.status(404).json({ error: 'Not found', details: 'El usuario no existe' });
            }

            pool.query(queries.updateLugarid, [lugarid, numero_colegiado], (error, results) => {
                if (error) {
                    console.error('Error updating lugar_id:', error);
                    return res.status(500).json({ error: 'Internal server error', details: error.message });
                }
                res.status(200).json({ message: 'Usuario actualizado exitosamente' });
            })
        })
    } catch (error) {
        console.error('Unexpected error in updateLugarid:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
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