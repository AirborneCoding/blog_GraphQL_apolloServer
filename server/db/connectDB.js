const mongoose = require("mongoose")

const connectDB = (uri) => {
    return mongoose.connect(uri)
}

module.exports = connectDB


/* 
, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // connectTimeoutMS: 30000, 
        // socketTimeoutMS: 30000,  
    }
*/