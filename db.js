const mongoose = require("mongoose");
const employees = mongoose.Schema({
                                empname: {type:String},
                                products:{type:Number}
                                    });

module.exports = mongoose.model("employee",employees);