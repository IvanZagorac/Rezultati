const crypto = require("crypto");
const bcrypt = require("bcrypt");
let jwt = require('jsonwebtoken');
const config = require('../config/config');



module.exports=  function(express,user) {
    let usersRouter = express.Router();

    /*usersRouter.post('', async (req,res)=>{
        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(req.body.password);
        const passwordHashString=passwordHash.digest('hex').toUpperCase();
        let hash = await bcrypt.hash(req.body.password,10);
        let username=req.body.username;
        let email=req.body.email;
        let name=req.body.name;

        let newUser=new user({
            username:username,
            email:email,
            name:name,
            password:hash
        })
        newUser.save().then(users=>{
            console.log(users)
            res.send(users);
        })

    });*/
    usersRouter.use(function(req, res, next){

        let token = req.body.token || req.params.token || req.headers['x-access-token'] || req.body.query;

        console.log(token);

        if (token){

            jwt.verify(token, config.secret, function (err, decoded){

                if (err){
                    return res.status(403).send({
                        success:false,
                        message:'Wrong token'
                    });

                } else {
                    req.decoded=decoded;
                    next();
                }

            });

        } else {
            console.log("No token")

            return res.status(403).send({
                success:false,
                message:'No token'
            });

        }
    });

    usersRouter.get('',(req,res)=>{
        user.find({}).then((lists)=>{
            res.send(lists);
        })

    });


    usersRouter.get('/:id', (req, res) => {
        const id = req.params.id;
        user.findById(id, (err, foundUser) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(foundUser);
            }
        });
    });


    usersRouter.patch('/:id',(req,res)=>{
            user.findOneAndUpdate({_id:req.params.id},{
                $set:req.body
                }).then((user)=>{
                    res.send(user);
                    res.status(200);
            })
    })

    usersRouter.delete('/:id',(req,res)=>{
        user.findOneAndRemove({_id:req.params.id})
            .then((deletedListUser)=>{
            res.send(deletedListUser);
        })
    })


    return usersRouter;

}