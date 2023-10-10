const router = require('express').Router();
const {uploadFiles} = require('../uploads/aws');
const pdfModel = require('../models/pdf');

router.post('/uploadPdf',async(req, res)=>{
    try {
        const file = req.files;
        if(!file || file.length ==0 ){
            return res.status(400).json({
                
                status : false,
                message : "Please upload a file"
            })
        }
        if(!req.body.name){
            return res.status(400).json({
                status : false,
                message : "Please provide a name for the pdf"
            })
        }
        else{
            const url = await uploadFiles(file[0])
            if(url === ""){
                return res.status(404).json({
                    status : false,
                    message : "File not uploaded"
                })
            }
            else{
                const uploadPdfParams  = {
                    pdf : url,
                    name : req.body.name
                }
                const newData = await pdfModel.create(uploadPdfParams)
                return res.status(200).json({
                    status : true,
                    data : newData
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            status : false,
            message : error.message
        })
    }
})



const getPdf = async(req, res) => {
    try{
        const data = await pdfModel.find();
        res.status(200).json({
            status : true,
            data : data
        });

    }catch(error){
    res.status(500).json({
        status : false,
        message : error.message
    });
    }
}

// api================================================================
router.get('/getPdf', getPdf);

module.exports = router;