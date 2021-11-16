const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studentsapi")

    .then(() => console.log("connection scccessfull...."))
    .catch((err) => console.log(" no connection"))