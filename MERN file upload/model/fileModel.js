const mongoose = require('mongoose')
const File = new mongoose.Schema({
    fieldname: {
        type: String,
        required:true
    },
    originalname: {
        type: String,
        required:true
    },
    encoding: {
        type: String,
        required:true
    },
    mimetype: {
        type: String,
        required:true
    },
    destination: {
        type: String,
        required:true
    },
    filename: {
        type: String,
        required:true
    },
    path: {
        type: String,
        required:true
    },
    size: {
        type: Number,
        required:true
    },
    userId: {
        type: String,
        required:true
    }
}, {
    collection: "files",
    timestamps: true
})

module.exports = mongoose.model("File", File)