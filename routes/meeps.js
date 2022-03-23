const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../database');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const flash = req.session.flash;
    req.session.flash = null;
    await pool.promise()
        .query(`SELECT * FROM meeps`)
        .then(([rows,fields]) => {
            console.log(rows);
            res.render('meeps.njk', {
                flash: flash,
                Body: rows,
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
            })
        });

module.exports = router;