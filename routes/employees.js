const express = require('express')
const router = express.Router()

const { auth } = require('../middlewares/auth')
const { getAll, add, remove, edit, getSingle } = require('../controllers/employees')

router.get('/', auth, getAll)

router.get('/:id', auth, getSingle)

router.post('/add', auth, add)

router.post('/remove/:id', auth, remove)

router.put('/edit/:id', auth, edit)

module.exports = router;