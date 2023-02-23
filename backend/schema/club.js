
const mongoose=require("mongoose");


const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    leagueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'leagues'
    },
    location: String
});

module.exports=mongoose.model("club",clubSchema);
