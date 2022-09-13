const UserModel=require('./user.model')
const EventEmitter=require('events')

exports.createUser=function(data){
    return new Promise(function(resolve,reject){
        data.email=data.email.toLowerCase()
        var userdata=UserModel(data)
        userdata.save().then(function(result){
            console.log("Result of mongodb operation",result)
            resolve();
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

exports.findUser=function(data){
    console.log(".........." , data)
    return new Promise(function(resolve,reject){
        var queryObj ={
            email:data.email.toLowerCase(),
            password:data.password
        }
        console.log(".......... just before passing it to db" , queryObj)

        const projection={profilecompleted: 1,image: 1,name: 1,email: 1,_id:0}

        UserModel.findOne(queryObj,projection).then(function(result){
            console.log("Finding user from db ",result)
            if(result){
                resolve(result);
            }
            else{
                reject("Invalid Credentials");
            }
        }).catch(function(error){
            reject();
            console.log("Error in finding user from db");
        })
    })
}

exports.deleteUser=function(data){
//     console.log(data)
//     return new Promise(function(resolve,reject){
//         UserModel.deleteOne(req.body.email)
//     })
}

exports.recoverPassword=(data)=>{
    console.log(".........." , data)
    let emitter = new EventEmitter()
    console.log("Here we are finding password of user")
    var queryObj = {email:data.email}
    UserModel.findOne(queryObj).then((result)=>{
        console.log("result of db operation", result)
        if(result){
            return emitter.emit("MIl_GAYA" , result)
        }
        else{
            return emitter.emit("NOT_FOUND")
        }
    }).catch((error)=>{
        return emitter.emit("ERROR")
    })

    return emitter
}

exports.findUsers=function(data){
    return new Promise((resolve,reject)=>{
    // console.log("In service")
    // console.log(data)
    UserModel.find(
        { "email": { "$regex": data.q, "$options": "i" } },
    ).then(function(result){
        resolve(result)
    }).catch(function(error){
        reject(error);
    })
    })

}

exports.updateProfile=(data,cb)=>{
    var queryObject={
        email:data.email
    }
    var updateObject ={
        "$set":{
            image:data.image,
            name:data.name,
            profilecompleted:true
        }
    }
    UserModel.findOneAndUpdate(queryObject,updateObject).then((result)=>{
        console.log("Result of update user from db : ",result)
        cb(null,result)
    }).catch((error)=>{
        console.log("Error of update user from db:",error)
        cb(error,null)
    })
}

