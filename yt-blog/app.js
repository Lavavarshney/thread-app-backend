require("dotenv").config();
const express=require('express');
const path= require('path');
const userRoute = require('./router/user')
const blogRoute = require('./router/blog')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog')
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app= express();
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL).then(e =>console.log("mongodb connected"))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'))
//app.use(express.static(path.resolve('./public')))
app.use(express.static('public'));

app.set("view engine","ejs")
app.set("views", path.resolve('./views'))
app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({});
    console.log("User data:", req.user);
    res.render("home",{
        user: req.user,
        blogs: allBlogs,
    });
})


app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.listen(PORT,()=>console.log(`Server started at ${PORT}`))