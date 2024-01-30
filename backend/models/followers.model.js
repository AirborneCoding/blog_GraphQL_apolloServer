const mongoose = require("mongoose")

const FollowersSchema = new mongoose.Schema({
    followedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}
);

module.exports = mongoose.model("Followers", FollowersSchema)
