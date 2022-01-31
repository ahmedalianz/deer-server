const router=require('express').Router()
const classController=require('../controllers/class.controller')

router.post('/addClass',classController.addClass)
router.post('/addIp',classController.addIp)
router.delete('/removeIp/:id',classController.removeIp)

router.patch('/editClass/:classId',classController.editClass)
router.get('/getSingleClass/:classId',classController.getSingleClass)
router.delete('/removeClass/:classId',classController.removeClass)

router.get('/showMClass',classController.showMClass)
router.get('/showNClass',classController.showNClass)
router.patch('/reserveClass/:classId',classController.reserveClass)
router.patch('/removePerson/:classId/:personId',classController.removePerson)
router.patch('/removeAllPeople/:classId',classController.removeAllPeople)
router.patch('/hideClass/:classId',classController.hideClass)

module.exports=router