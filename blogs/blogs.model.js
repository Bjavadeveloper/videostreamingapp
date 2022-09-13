const Mongoose=require('mongoose')
const Blogging=new Mongoose.Schema({
    name:{type:String,required:true},
    title:{type:String,required:true},
    url:{type:String,required:true},
    description:{type:String,required:true},
    creator:{type:String,required:true}
})

const BloggingModel=Mongoose.model("blogs",Blogging);

module.exports=BloggingModel;
