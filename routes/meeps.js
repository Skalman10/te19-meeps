const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../database');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    await pool.promise()
        .query(`SELECT * FROM meeps`)
        .then(([rows, fields]) => {
            console.log(rows);
            res.render('meeps.njk', {
                meeps: rows,
                title: 'Meeps',
                layout: 'layout.njk'
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

router.post('/', async (req, res, next) => {
    const meep = req.body.body;

    await pool.promise()
        .query('INSERT INTO meeps (body) VALUES (?)', [meep])
        .then((response) => {
            console.log(response[0].affectedRows);
            if (response[0].affectedRows === 1) {
                res.redirect('/meeps');
            } else {
                res.status(400).json({
                    meeps: {
                        error: 'Invalid meep'
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                meeps: {
                    error: 'Error posting meep'
                }
            })
        });
}
);

module.exports = router;