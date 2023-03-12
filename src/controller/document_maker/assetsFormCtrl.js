const express = require('express');
const XLSX = require('xlsx');
const AC = require('../../models/document_maker/AnaliseCritica/AnaliseCriticaClass');
const TR = require('../../models/document_maker/TR/TRClass');
const DFD = require('../../models/document_maker/DFD/DFDClass');
const DR =  require('../../models/document_maker/DiexReq/DiexReqClass');
const CA = require('../../models/document_maker/CertificadoDeAdoção/CAClass');
require('../../models/document_maker/TR/TRDB');
require('../../models/document_maker/CertificadoDeAdoção/CADB');
const {isAuth} = require('../../../config/isAuth');
const resolver =  require('../../../config/errorHandler');
const uploadAsync = require('../../models/document_maker/uploadsMaker');
const ACDB = require('../../models/document_maker/AnaliseCritica/AnaliseCriticaDB');



const printer = require('../../../public/js/builders/Printer');

const router = express.Router();

//Config of XLSX
function contentxlsx(workbook){ //receive XLSX.readFile(file.path)
    let worksheets = {}
    for(let sheetname of workbook.SheetNames){
        worksheets[sheetname] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname])
    }
    return worksheets
}

router.get('/Bens', isAuth, resolver((req,res) =>{    
    res.render('document_maker/assetsForm');
}))

router.post('/TR', isAuth, resolver( async(req,res) => {    
    const file = await uploadAsync(req, res);
    console.log(file)  
    TR.getMap(contentxlsx(XLSX.read(Buffer.from(file.buffer))))
    TR.getValues(req.body);       
    TRDB.find({_id: {$in: TR.TRDB()}}).lean().then((item) =>{        
        const chunks = [];
        const pdfDoc = printer.createPdfKitDocument(TR.analysis(item))
        pdfDoc.on('data', (chunk) => {        
            chunks.push(chunk);
        });
        TR.resetValues()
        pdfDoc.end();      
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);            
            res.end(result);
        })
    });
}))

router.post('/CA', isAuth, resolver( async (req,res) =>{   
    const file = await uploadAsync(req, res)
    CA.getMap(contentxlsx(XLSX.read(Buffer.from(file.buffer))));
    CA.getValues(req.body);
        
    CADB.find({_id: {$in: CA.itensDB()}}).lean().then((item) =>{
        const chunks = [];
        const pdfDoc = printer.createPdfKitDocument(CA.analysis(item))
        pdfDoc.on('data', (chunk) => {        
            chunks.push(chunk);
        });
        CA.resetValues()
        pdfDoc.end();      
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);            
            res.end(result);
        });
    });
}));

router.post('/DFD', isAuth, resolver( async(req,res) => {    
    const file = await uploadAsync(req, res);
    DFD.getMap(contentxlsx(XLSX.read(Buffer.from(file.buffer))));
    DFD.getValues(req.body);       
    const chunks = [];
        const pdfDoc = printer.createPdfKitDocument(DFD.analysis())
        pdfDoc.on('data', (chunk) => {        
            chunks.push(chunk);
        });
        DFD.resetValues()
        pdfDoc.end();      
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);
            res.end(result);
        })
}));

router.post('/DiexReq', isAuth, resolver((req, res) => {        
    DR.getValues(req.body);
    const chunks = [];
        const pdfDoc = printer.createPdfKitDocument(DR.analysis())
        pdfDoc.on('data', (chunk) => {        
            chunks.push(chunk);
        });
        DR.resetValues()
        pdfDoc.end();      
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);            
            res.end(result);
        })
}));

router.post('/analise_critica', isAuth, resolver( async(req,res) => {   
    const file = await uploadAsync(req, res);    
    AC.getMap(contentxlsx(XLSX.read(Buffer.from(file.buffer))));    
    if(AC.analysisParam() != null){
        req.session.file = file;
        req.session.bodyValues = req.body;              
        res.render('document_maker/graphic', AC.analysisParam())
    }else{         
        res.redirect(307, '/montagem/analise_critica1');
    }
}))

router.post('/analise_critica1', isAuth, resolver( async(req,res) => {    
    if (req.session.bodyValues) {
        AC.getValues(req.session.bodyValues);
        AC.getMap(contentxlsx(XLSX.read(Buffer.from(req.session.file.buffer))));
        delete req.session.bodyValues;
        delete req.session.file;     
    }    
    AC.getValues(req.body);
    
    const values =  await ACDB.findMany(['1.1.1a', AC.item112(), AC.item113(), AC.item114(),
    AC.item115(),AC.item311(), AC.item312()]);


    const chunks = [];
        const pdfDoc = printer.createPdfKitDocument(AC.analysis(values));
        pdfDoc.on('data', (chunk) => {                  
            chunks.push(chunk);
        });
        AC.resetValues()
        pdfDoc.end();      
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);            
            res.end(result);
        });   
}));


module.exports = router