const Express=require('express')
const blogsController=require('./blogs.controller')
const router=Express.Router()

router.post('/register',blogsController.register)

module.exports=router