const express = require('express')
const router = express.Router()

const { auth } = require('../middlewares/auth')
const { getAll, add } = require('../controllers/employees')

router.get('/', auth, getAll)

router.get('/:id', auth, () => {
    console.log('get single employee')
})

router.post('/add', auth, add)

router.post('/remove/:id', auth, () => {
    console.log('remove single employee')
})

router.put('/edit/:id', auth, () => {
    console.log('update single employee')
})



module.exports = router;