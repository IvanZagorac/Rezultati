
const mongoose=require("mongoose");


const resultSchema = new mongoose.Schema({
    clubA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    },
    clubB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    },
    scoreA: Number,
    scoreB: Number,
    leagueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'League'
    }
});

module.exports=mongoose.model("results",resultSchema);