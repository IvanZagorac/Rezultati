

module.exports=function(express,sports,Users){
    let sportsRouter=express.Router();

    sportsRouter.get('',(req,res)=>{
        sports.find({}).then(sportsList=>{
            res.send(sportsList);
        })
    })

    sportsRouter.get('/:id',(req,res)=>{
        sports.findById({_id:req.params.id},(err,foundUser)=>{
            if(err){
                res.status(500).send(err);
            }else{
                res.send(foundUser)
            }
        })
    })

    sportsRouter.post('',(req,res)=>{
        let name=req.body.name;
        let userId=req.body.userId;
        const sport= new sports({
            name:name,
            userId:userId
        })
        sport.save().then((sportList)=>{
            res.status(201).json({ sportList });
        })

    })

    sportsRouter.delete("/:id",(req,res)=>{
        sports.findOneAndRemove({_id:req.params.id}).
            then((removedList)=>{
                res.send(removedList);
        })
    })

    sportsRouter.patch("/:id",(req,res)=>{
        sports.findOneAndUpdate({_id:req.params.id},{
            $set:req.body
        }).then((sport)=>{
            res.send(sport);
            res.status(200);
        })
    })

    return sportsRouter;

}