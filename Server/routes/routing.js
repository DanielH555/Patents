const { add, gettingPatents, updating, deleting, getById } = require('../controller/control')
const router = require('express').Router()

router.get('/home', gettingPatents)
router.get('/byname/:id', getById)
router.post('/add',add)
router.put('/update/:id', updating)
router.delete('/delete/:id', deleting)
router.get('*', gettingPatents)


module.exports = router