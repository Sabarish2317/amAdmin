// //model
// const db = require('../config/db');

// module.exports = {
//   getAllUsers() {
//     return new Promise((resolve, reject) => {
//       db.query('SELECT * FROM users', (error, results, fields) => {
//         if (error) {
//           reject(error);
//           return;
//         }
//         resolve(results);
//       });
//     });
//   },}

// //controller
// const userModel = require('../models/user');

// module.exports = {
//   async getUsers(req, res, next) {
//     try {
//       const users = await userModel.getAllUsers();
//       res.render('index', { users });
//     } catch (error) {
//       next(error);
//     }
//   },}


//   //router
//   const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// router.get('/', userController.getUsers);
// router.get('/:id', userController.getUser);

// module.exports = router;