const mongoose=require("mongoose");


const sportSchema=new mongoose.Schema({
    name:String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports=mongoose.model("sports",sportSchema);