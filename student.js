const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    roll_no : {type: Number, required: true, unique: true},
    name : {type: String, required: true},
    class : {type: Number, required: true},
    section : {type: String, required: true}
},
{ timestamps: true }


);
module.exports = mongoose.model("Student",studentSchema);