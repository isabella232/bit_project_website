"use strict";

var mongoose = require('mongoose');

var urlAndDBName = 'mongodb://127.0.0.1:27017/volunteer-api';
MONGODB_URL = "mongodb+srv://mongobit:bitproject2019@cluster0-cbnni.mongodb.net/volunteer-api";
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true // quickly access data using indices

});