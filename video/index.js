const Express=require('express')
const router= Express.Router()
const videoController=require('./video.controller')

router.post('/uploadvideo',videoController.addVideo)

router.get('/getallvideos',videoController.getAllVideos)

router.get("/getdetails/:videoid",videoController.getVideodetails)

module.exports=router