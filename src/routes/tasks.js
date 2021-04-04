const express = require('express');
const router = express.Router();
const pool = require('../database')
const asignaturas = require('../lib/asignaturas.json');



//TODO authentication
// const { isAuthenticated} = require('../lib/authentication');

router.get('/add' ,  (req, res) => {
    res.render('actions/addTask', asignaturas );

});

router.post('/add' , async (req, res) => { 

  const task = req.body;

    // Save info in the BD 
  await pool.query("INSERT INTO task set ?" , [task]);
  req.flash('success' , 'Haz agregado una nueva tarea!');

  res.redirect('/add');
});

module.exports = router;