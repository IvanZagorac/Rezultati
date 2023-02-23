

module.exports=function(express,clubs,leagues){
    let clubRouter=express.Router();

    clubRouter.get('',(req,res)=>{
        clubs.find({}).then(clubsList=>{
            res.send(clubsList);
        })
    })

    clubRouter.get('/:id',(req,res)=>{
        clubs.findById({_id:req.params.id},(err,foundUser)=>{
            if(err){
                res.status(500).send(err);
            }else{
                res.send(foundUser)
            }
        })
    })

    clubRouter.post('',(req,res)=>{
        let name=req.body.name;
        let location=req.body.location;
        let leagueId=req.body.leagueId;

        const league=leagues.findById(leagueId);
        if (!league) {
            return res.status(400).json({ error: "User not found" });
        }

        const club= new clubs({
            name:name,
            location:location,
            leagueId:leagueId
        })
        club.save().then((leagueList)=>{
            res.status(201).json({ leagueList });
        })

    })

    clubRouter.delete("/:id",(req,res)=>{
        clubs.findOneAndRemove({_id:req.params.id}).
        then((removedList)=>{
            res.send(removedList);
        })
    })

    clubRouter.patch("/:id",(req,res)=>{
        clubs.findOneAndUpdate({_id:req.params.id},{
            $set:req.body
        }).then((sport)=>{
            res.send(sport);
            res.status(200);
        })
    })

    return clubRouter;

}