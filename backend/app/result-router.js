

module.exports=function(express,results,clubs){
    let resultRouter=express.Router();

    resultRouter.get('',(req,res)=>{
        results.find({}).then(resultsList=>{
            res.send(resultsList);
        })
    })

    resultRouter.get('/:id',(req,res)=>{
        results.findById({_id:req.params.id},(err,foundUser)=>{
            if(err){
                res.status(500).send(err);
            }else{
                res.send(foundUser)
            }
        })
    })

    resultRouter.post('',(req,res)=>{
        let clubA=req.body.clubA;
        let clubB=req.body.clubB;
        let scoreA=req.body.scoreA;
        let scoreB=req.body.scoreB;
        let leagueId=req.body.leagueId;

        const result= new results({
            clubA:clubA,
            clubB:clubB,
            scoreA:scoreA,
            scoreB:scoreB,
            leagueId:leagueId
        })
        console.log(result);
        result.save().then((resultList)=>{
            console.log(resultList);
            res.status(201).json({ resultList });
        })

    })

    resultRouter.delete("/:id",(req,res)=>{
        results.findOneAndRemove({_id:req.params.id}).
        then((removedList)=>{
            res.send(removedList);
        })
    })

    resultRouter.patch("/:id",(req,res)=>{
        results.findOneAndUpdate({_id:req.params.id},{
            $set:req.body
        }).then((sport)=>{
            res.send(sport);
            res.status(200);
        })
    })

    return resultRouter;

}