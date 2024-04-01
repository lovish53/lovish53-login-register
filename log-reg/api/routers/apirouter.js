const router=require('express').Router();
const regc=require('../controllers/regcontroller')

router.post('/',regc.registerpage)
router.post('/login',regc.loginpage)
router.get('/details',regc.details)
router.get('/singledata/:id',regc.singledata)
router.put('/updateform/:id',regc.updateform)




module.exports=router