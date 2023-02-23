const crypto = require("crypto");
const util = require("util");
const bcrypt = require("bcrypt");
let jwt = require('jsonwebtoken');
const config = require('../config/config');



module.exports=function(express,user){
    let authRouter = express.Router();


    authRouter.post('/', async function(req,res){

        try{

            let rows = await user.find({
                username:req.body.username
            })

            if (rows.length==0)  res.json({ status: 'NOT OK', description:'Username doesnt exist' }); else {
                /*const passwordHash=crypto.createHash('sha512');
                passwordHash.update(req.body.password);
                const passwordHashString=passwordHash.digest('hex').toUpperCase();
                console.log(rows[0].password+ "rows")
                console.log(passwordHashString)*/
                let validPass = await bcrypt.compare(req.body.password, rows[0].password);
                console.error(validPass)
                if (rows.length > 0 && validPass) {
                    let token = jwt.sign({
                        username: rows[0].username,
                        _id:rows[0]._id
                        //level: rows[0].level
                    }, config.secret, {
                        expiresIn: 1440
                    });

                    res.json({
                        status: 200,
                        token: token,
                        user: {username: rows[0].username,_id:rows[0]._id}//tu je level iso
                    });

                }
                   if(!validPass) res.json({status: 5, description: 'Wrong password'});


            }


        }

        catch (e) {
            console.log(e);
            res.json({status: 'NOT OK'});
        }

    });


    return authRouter;

}
