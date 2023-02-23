

module.exports=function(express,leagues,sports){
    let leagueRouter=express.Router();

    leagueRouter.get('',(req,res)=>{
        leagues.find({}).then(leaguesList=>{
            res.send(leaguesList);
        })
    })

    leagueRouter.get('/:id',(req,res)=>{
        leagues.findById({_id:req.params.id},(err,foundUser)=>{
            if(err){
                res.status(500).send(err);
            }else{
                res.send(foundUser)
            }
        })
    })

    leagueRouter.post('',(req,res)=>{
        let name=req.body.name;
        let country=req.body.country;
        let sportId=req.body.sportId;

        const sport=sports.findById(sportId);
        if (!sport) {
            return res.status(400).json({ error: "User not found" });
        }

        const league= new leagues({
            name:name,
            country:country,
            sportId:sportId
        })
        league.save().then((leagueList)=>{
            res.status(201).json({ leagueList });
        })

    })

    leagueRouter.delete("/:id",(req,res)=>{
        leagues.findOneAndRemove({_id:req.params.id}).
        then((removedList)=>{
            res.send(removedList);
        })
    })

    leagueRouter.patch("/:id",(req,res)=>{
        leagues.findOneAndUpdate({_id:req.params.id},{
            $set:req.body
        }).then((sport)=>{
            res.send(sport);
            res.status(200);
        })
    })

    return leagueRouter;

}