const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

//register a new user
router.post('/register', async (req, res) => {
    try {
        //check if the user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: 'User already exists'
            });
        }
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //create a new user
        const user = new User(req.body);
        await user.save();
        res.send({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })

    }
});   

//login a user
router.post('/login', async (req, res) => {
    try {
       //check if the user exists
         const user = await User.findOne({ email:req.body.email });
         if(!user){
             return res.send({
                 success:false,
                 message:'User does not exist'
             });
         }
         //check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.send({
            success:false,
            message:'Invalid password'
        });
    }
    //create and assign a token
    const token = jwt.sign({userid: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});

    res.send({
        success:true,
        message:'Login successful',
        data: token
    });
}
    catch(error){
        res.send({
            success:false,
            message:error.message,
        })
    }
});
        //get user details by id
    
    router.get('/get-current-user' ,authMiddleware, async (req, res) => {
        console.log(req.user);
        try {
            const user = await User
        
            .findById(req.user.userid)
            .select('-password');
            if (!user) {
                return res.send({
                  success: false,
                  message: 'User not found',
                });
              }
            res.send({
                success:true,
                data:user
            });
            
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
            
        }
    }
    )
module.exports = router;