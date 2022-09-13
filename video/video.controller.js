const { response } = require("express")
const VideoService = require("./video.service")

exports.addVideo = (req,res)=>{
    console.log("data received in body", req.body)
    VideoService.createVideo(req.body).then((result)=>{
        res.send({
            message:"Video Added"
        })
    }).catch((error)=>{
        res.status(500).send()
    })
}

exports.getAllVideos=(req,res)=>{
    console.log("Now Browser in the Controller Page:")
    VideoService.getAll().then((result)=>{
        console.log('....................',result)
        res.send({
            // message:"Details fetched succssfully",
            response:result
        })
    }).catch((error)=>{
        console.log(error)
    })
}

exports.getVideodetails = (req,res)=>{
    VideoService.getVideoDetails(req.params).then((result)=>{
        res.send({
            data:result
        })
    }).catch((error)=>{
        res.status(500).send()
    })
}
