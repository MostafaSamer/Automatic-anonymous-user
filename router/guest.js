const router = require('express').Router()
const guest = require('../controller/guest')

router.post('/add', guest.createNewGuest)
router.post('/getAll', guest.getAllCurrentGuests)
router.post('/someActoion', guest.someActoion)

module.exports = router;