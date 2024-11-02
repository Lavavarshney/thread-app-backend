
const {validateToken} = require('../services/authentication')
 function checkForAuthenticationCookie(cookieName){
return (req,res,next) => {
    const tokenCookieValue =  req.cookies[cookieName]
    console.log("tokenCookieValue:", tokenCookieValue);

    if(!tokenCookieValue)
    {
       return next();
    }
    try{
        console.log("inside try block");
    const userPayload =  validateToken(tokenCookieValue);
    console.log("userPayload",userPayload);
    req.user = userPayload;

    }
    catch(error){}
    next(); 
};
}
module.exports = { checkForAuthenticationCookie }