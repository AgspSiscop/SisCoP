const express = require('express');
const mongoose =  require('mongoose');
const fs = require('fs');


const router = express.Router();

router.get('/logout', (req, res) => {
    req.logout(function(error) {
        if (error) { return next(error) }
        res.redirect('/')
      });    
})

module.exports = router;