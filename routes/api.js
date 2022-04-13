const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async function (req, res, next) {
    await pool.promise()
        .query(`SELECT * FROM iskthl_meeps`)
        .then(([rows, fields]) => {
            console.log(rows);
            res.json({
                meeps: {
                    data: rows
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                tasks: {
                    error: `Error getting meeps`
                }
            })
        });
});

module.exports = router;