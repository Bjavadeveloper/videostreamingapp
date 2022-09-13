const blogsService=require('./blogs.service')

exports.register=(req,res)=>{

    blogsService.createBlog(req.body).then(function(result){
        res.send({
            message:"User Created"
        })
        console.log(result.name)
    },function(error){
        if(error){
            res.status(409).send({
                message:"User Already exist"
            })
        }else{
            res.status(500).send()
        }
        console.log("It reached in rejection of controller")
    })

}