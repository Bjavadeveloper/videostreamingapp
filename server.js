// Old Approach
// ES5
const Express = require('express')
// const fs=require('fs')
const Mongoose=require('mongoose')
const dburl="mongodb+srv://dhanupandey:test12345@cluster0.s2usivc.mongodb.net/?retryWrites=true&w=majority"
const cors=require("cors")

//node_modules
//internal node

const path =require('path')

// import Express from 'express';
//it will directly go to node_modules
//It will give you default thing
//ES6

const corsOptions ={
    exposedHeaders:"Authorization",
}

const server=Express()
const port =5000
server.use(cors(corsOptions))
server.use(Express.json())
server.use('/user',require('./user'))
server.use('/blogs',require('./blogs'))
server.use('/video',require('./video'))

//If server started then only we will connect to the Database.
server.listen(port,function(){
    Mongoose.connect(dburl,function(error,client){
        if(error){
            console.log("Error in connecting to database",error)

        }else{
            console.log("Connected To Database")
        }
    })
    console.log("Server is listening On :",port);
});


//Middle Ware 
//which will executes before every request .
// server.use(Express.static(path.resolve(__dirname,"./build")));
// server.get("/",function(request,response){
//     response.sendFile(path.resolve(__dirname,'./build/index.html'));
// });










