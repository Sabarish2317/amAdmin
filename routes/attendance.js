
const express = require('express');
const router = express.Router();
const markAttendance= require('../modules/AuthAttendance/stAttendance');


router.post('/', markAttendance);
//router.get('/' , getAttendance);


module.exports = router;


//