const {Schema, model} = require("mongoose");

const ResourceParams = new Schema({
    resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
    statement: { type: String, default: 'Формы документов' },
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    
});



module.exports = model("ResourceParams", ResourceParams )