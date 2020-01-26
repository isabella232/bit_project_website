const mongoose = require('mongoose')

MONGODB_URL="mongodb+srv://mongobit:bitproject2019@cluster0-cbnni.mongodb.net/volunteer-api"


mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true // quickly access data using indices
})