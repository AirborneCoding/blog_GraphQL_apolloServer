const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const usernameValidator = (username) => {
    return /^[a-zA-Z0-9_]+$/.test(username);
};

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        minlength: 3,
        maxlength: 50,
        trim: true,
        unique: [true, "this name is already used by other aa , Please provide a different name"],
        validate: {
            validator: usernameValidator,
            message: 'Usernames can only contain alphanumeric characters and underscores.',
        },
    },
    email: {
        type: String,
        unique: [true, "this email is already used by other , Please provide a different email"],
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 150,
        sparse: true,
    },
    description: {
        type: String,
        trim: true,
        sparse: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    avatar: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            id: null,
        },
    },
    followersCount: {
        type: Number,
        default: 0,
    },
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false,
    },
    verified: Date,
    passwordToken: {
        type: String,
    },
    passwordTokenExpirationDate: {
        type: Date,
    },
},
    {
        timestamps: true,
    }

);


// *########################################################################

// Populate Followers For user
UserSchema.virtual("followers", {
    ref: "Followers",
    foreignField: "followedUserId",
    localField: "_id",
});

// *########################################################################

//hash ispassword change pre save
UserSchema.pre("save", async function () {
    // console.log(this.isModified("password"));
    if (!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//! create jwt hook
UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}

// comparePassword hook
UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}



module.exports = mongoose.model("User", UserSchema)