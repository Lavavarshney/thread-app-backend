const { Router } = require('express');
const User = require('../models/user');
const router = Router();

router.get('/signin', (req, res) => {
    return res.render("signin");
});

router.get('/signup', (req, res) => {
    return res.render("signup");
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPassword(email, password);
        console.log(token);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        console.error("Signin error:", error);
        return res.render('signin', {
            error: "Incorrect Email or Password"
        });
    }
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        await User.create({
            fullName,
            email,
            password,
        });
        } catch (error) {
        console.error("Signup error:", error);
        return res.render("signup", { error: "Signup failed, please try again" });
    }
});
router.get('/logout',(req,res)=>{
  res.clearCookie("token").redirect("/");
})
module.exports = router;
