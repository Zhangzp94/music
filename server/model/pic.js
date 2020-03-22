var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/music', {useNewUrlParser: true});
mongoose.connection.on("connected",function(){
    console.log("MongoDB connected success！！！！！！")
})
var userSchema  = new Schema({
    "Image":String
})
module.exports=mongoose.model("pic",userSchema)