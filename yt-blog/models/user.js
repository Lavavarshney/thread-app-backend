const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('node:crypto');
const {createToken} = require('../services/authentication')
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "/images/default.png",
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: "USER",
    }
}, { timestamps: true }); // Corrected 'timestamps'

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next(); // Call next() here

    const salt = randomBytes(16).toString('hex'); // Specified 'hex' encoding
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');
    
    this.salt = salt;
    this.password = hashedPassword;
    next(); // Call next() after setting salt and password
});
userSchema.static("matchPassword",async function(email,password){
  const user= await this.findOne({email}); 
  if(!user) throw new Error("User not found");
  const salt = user.salt;
  const hashedPassword = user.password;
const userProvidedHash= createHmac('sha256', salt)
.update(password)
.digest('hex');
if(hashedPassword !== userProvidedHash)
    throw new Error("Incorrect password");
const token = createToken(user)
return token

});
const User = model('user', userSchema);
module.exports = User;
