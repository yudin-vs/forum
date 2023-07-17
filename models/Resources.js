const {Schema, model} = require("mongoose");

const Resource = new Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    params: { type: Schema.Types.ObjectId, ref: 'ResourceParams' },
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    
});



module.exports = model("Resource", Resource )