const router=require('express').Router()
const userController=require('../controllers/admin.controller')
const auth=require('../middlewares/auth')
const upload=require('../middlewares/upload')

router.post('/login',userController.login)
router.post('/registerAdmin',userController.registerAdmin)

router.patch('/editProfile',auth(""),userController.editProfile)
router.get('/showProfile',auth(""),userController.showProfile)
router.patch('/changePhoto/:id',auth(""),upload.single('img'),userController.changePhoto)
router.get('/logout',auth(""),userController.logout)

module.exports=router