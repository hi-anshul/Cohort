const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin,Course } = require("../db");
const router = Router();

// Admin Routes
app.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const checkUser = await Admin.findOne({username})

    if(checkUser){
        res.status(404).send("User already exist")
    }
    Admin.create({
        username:username,
        password:password
    })
    res.json({
        "msg":"User Created successfully"
    })

    
});

app.post('/courses', adminMiddleware, (req, res) => {
    Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
    })
});

app.get('/courses', adminMiddleware, (req, res) => {
    Course.find().then((courses)=>{
        res.json(courses)
    })
});

module.exports = router;