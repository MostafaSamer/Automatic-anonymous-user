const router = require('express').Router()
const index = require('../controller/index')

router.post('/', index.getHomePage)

module.exports = router;