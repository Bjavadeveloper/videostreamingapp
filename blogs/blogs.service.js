const BloggingModel = require("./blogs.model")


exports.createBlog=(data)=>{
    return new Promise(function(resolve,reject){
        var userdata=BloggingModel(data)
        userdata.save().then(function(result){
            console.log("Result of mongodb operation",result)
            resolve(result);
        },function(error){
            if(error.code=11000){
                console.log("Error in saving user to database",error)
                reject(error);
            }else{
                reject();
            }
        })
    })
    
}