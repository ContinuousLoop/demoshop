const express = require('express');

const router = express.Router();
const errorController = require('../controllers/404');

router.use(errorController.useErrorPage);


module.exports = router;