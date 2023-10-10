
const mongoose = require('mongoose');

const upLoadedPdf = new mongoose.Schema({
    pdf : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})
module.exports = mongoose.model("pdf", upLoadedPdf);