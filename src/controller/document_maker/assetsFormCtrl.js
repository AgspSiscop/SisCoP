const express = require('express');
const mongoose =  require('mongoose');
const XLSX = require('xlsx');
const multer =  require('multer');
const fs = require('fs');;
const AC = require('../../models/document_maker/AnaliseCritica/AnaliseCriticaClass');
const TR = require('../../models/document_maker/TR/TRClass');
const DFD = require('../../models/document_maker/DFD/DFDClass');
const DR =  require('../../models/document_maker/DiexReq/DiexReqClass');
const CA = require('../../models/document_maker/CertificadoDeAdoção/CAClass');
require('../../models/document_maker/AnaliseCritica/AnaliseCriticaDB');
require('../../models/document_maker/TR/TRDB');
require('../../models/document_maker/CertificadoDeAdoção/CADB');
require('../../models/document_reader/ProcessDB');
const ACDB = mongoose.model('analisecritica');
const TRDB = mongoose.model('tr');
const CADB = mongoose.model('certificadodeadocao');
const Process = mongoose.model('process');


const printer = require('../../../public/js/builders/Printer')
//const { workerData } = require('worker_threads');

const router = express.Router();
//Config of multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        fs.mkdir(`upload/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}`, (error) =>{});
        cb(null,`upload/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}`);
    },
    filename: function(req, file, cb){
        cb(null, `Mapa Comparativo de ${req.body.object}.xlsx`);
    }
})
const multerConfig = multer({storage})

//Config of XLSX
function contentxlsx(workbook){ //receive XLSX.readFile(file.path)
    let worksheets = {}
    for(let sheetname of workbook.SheetNames){
        worksheets[sheetname] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname])
    }
    return worksheets
}

function exist(req, res, next){
    try {       
        const process = {
            user: req.user,
            title: req.body.object,
            category: req.body.process == 0 ? 'Licitação' : 'Dispensa',
            dir: `${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}`,
            date: Intl.DateTimeFormat('pt-BR', { dateStyle: "full", timeStyle: "short" }).format(new Date()),
            year: (new Date).getFullYear().toString()       
        };
        new Process(process).save().then(() => {
            fs.mkdir(`upload/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}`, (error) =>{});
            next();
        }
        ).catch((error) => {
            if(error.code == 11000){
                next();
            }else{
                res.send('ERRO. POR FAVOR COMUNICAR O ADMINISTRADOR DO SISTEMA ANTES DE FAZER QUALQUER OPERAÇÃO!'+ error);
            }
        });
               
    } catch (error) {
        res.send('Erro: ' + error);
    }
}



router.get('/Bens',(req,res) =>{    
    res.render('document_maker/assetsForm');
})

router.post('/TR', multerConfig.single('file'), exist, (req,res) => {
    const {file, body} = req;    
    TR.getMap(contentxlsx(XLSX.readFile(file.path)))
    TR.getValues(body)
    
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
            fs.writeFile(`upload/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}/Termo de Referência.pdf`, result, (error) => {});
            res.end(result);
        })
    });
})

router.post('/CA', multerConfig.single('file'), exist, (req,res) =>{
    const {file, body} = req;
    CA.getMap(contentxlsx(XLSX.readFile(file.path)));
    CA.getValues(body)
    
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
            fs.writeFile(`upload/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}/Certificado de Adoção.pdf`, result, (error) => {});
            res.end(result);
        })

    })

})

router.post('/DFD', multerConfig.single('file'), exist, (req,res) => {
    const {file, body} = req;
    DFD.getMap(contentxlsx(XLSX.readFile(file.path)));
    DFD.getValues(body);
    
    const chunks = [];
        const pdfDoc = printer.createPdfKitDocument(DFD.analysis())
        pdfDoc.on('data', (chunk) => {        
            chunks.push(chunk);
        });
        DFD.resetValues()
        pdfDoc.end();      
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);
            fs.writeFile(`upload/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}/Documento de Formalização da Demanda.pdf`, result, (error) => {});
            res.end(result);
        })

})

router.post('/DiexReq', exist, (req, res) => {    
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
            fs.writeFile(`upload/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}/Diex Requisitório.pdf`, result, (error) => {});
            res.end(result);
        })
})

router.post('/analise_critica', multerConfig.single('file'),  exist, (req,res) => {
    const {file, body} = req;
       
    AC.getValues(body)
    AC.getMap(contentxlsx(XLSX.readFile(file.path)));       

    if(AC.analysisParam() != null){               
        res.render('document_maker/graphic', AC.analysisParam())
    }else{         
        res.redirect(307, '/montagem/analise_critica1')
    }
})

router.post('/analise_critica1', (req,res) => { //TODO mudar o parametro de todas as funções de AC   
    AC.getValues(req.body)    
    
    ACDB.find({_id: ['1.1.1a', AC.item112(), AC.item113(), AC.item114(),
    AC.item115(),AC.item311(), AC.item312()]}).lean().then((item) => {
        const chunks = [];
        const pdfDoc = printer.createPdfKitDocument(AC.analysis(item))
        pdfDoc.on('data', (chunk) => {        
            chunks.push(chunk);
        });
        AC.resetValues()
        pdfDoc.end();      
        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);
            fs.writeFile(`upload/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}/Análise Crítica da Pesquisa de Preços.pdf`, result, (error) => {});
            res.end(result);
        });
    })
})



module.exports = router