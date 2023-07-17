const {Schema, model} = require("mongoose");

const Role = new Schema({
    value: {type: String, unique: true},
})

Role.statics.values = ["USER", "ADMIN", "MANAGER"];

module.exports = model("Role", Role);