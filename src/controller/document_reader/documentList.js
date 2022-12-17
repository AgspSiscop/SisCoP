const express =  require('express');
const {DocumentManipulator, uploadFile} = require('../../models/document_reader/DocumentManipulator');

const router = express.Router();


router.get('/', (req, res) => {      
    res.render('document_reader/document_reader');
});

router.get('/:year', (req,res) => {
    let documents;
    try {
        documents = DocumentManipulator.process(`upload/${req.params.year}/`,req.user.level,req.user.section,req.user.name);
        res.render('document_reader/document_reader', {documents: documents, year: req.params.year});
    } catch (error) {
        console.log(error)
        res.redirect('/');                
    }
    
});

router.post('/:year/edit/:link', (req, res) =>{
    try {
        if((req.user.level != req.params.link.split('_')[0] || req.user.section != req.params.link.split('_')[1] || req.user.name != req.params.link.split('_')[2]) && (req.user.level != 10)){        
            res.redirect('/')
           }else{
            DocumentManipulator.rename(`upload/${req.params.year}/${req.params.link}`,
            `upload/${req.params.year}/${req.params.link.split('_')[0]}_${req.params.link.split('_')[1]}_${req.params.link.split('_')[2]}_${req.body.ename}`);
            res.redirect(`/meusprocessos/${req.params.year}`);
           }      
        
    } catch (error) {
        res.send('error' + error)        
    }
});

router.post('/:year/delete/:link', (req, res) => {
    try {
        if((req.user.level != req.params.link.split('_')[0] || req.user.section != req.params.link.split('_')[1] || req.user.name != req.params.link.split('_')[2]) && (req.user.level != 10)){        
            res.redirect('/')
           }else{
            DocumentManipulator.removeProcess(`upload/${req.params.year}/${req.params.link}`);
            res.redirect(`/meusprocessos/${req.params.year}`);
           }      
        
    } catch (error) {
        res.send('error' + error)        
    }
})

router.get('/:year/:link', (req, res) =>{
    let documents;
    try {
       if((req.user.level != req.params.link.split('_')[0] || req.user.section != req.params.link.split('_')[1] || req.user.name != req.params.link.split('_')[2]) && (req.user.level != 10)){        
        res.redirect('/')
       }else{
        documents = DocumentManipulator.readDir(`upload/${req.params.year}/${req.params.link}`);
        res.render('document_reader/documents', {year: req.params.year, title: req.params.link, documents: documents});
       }       
    } catch (error){
        res.redirect('/')
    }    
});

router.post('/:year/:link/edit/:file', (req, res) => {
    try {        
        if((req.user.level != req.params.link.split('_')[0] || req.user.section != req.params.link.split('_')[1] || req.user.name != req.params.link.split('_')[2]) && (req.user.level != 10)){        
            res.redirect('/')
           }else{
            let fileExtension = req.params.file.split('.');
            fileExtension = fileExtension[fileExtension.length -1];
            DocumentManipulator.rename(`upload/${req.params.year}/${req.params.link}/${req.params.file}`,
            `upload/${req.params.year}/${req.params.link}/${req.body.ename}.${fileExtension}`);
            res.redirect(`/meusprocessos/${req.params.year}/${req.params.link}`);
           }      
        
    } catch (error) {
        res.send('error' + error)        
    }
});

router.post('/:year/:link/delete/:file', (req, res) => {
    try {        
        if((req.user.level != req.params.link.split('_')[0] || req.user.section != req.params.link.split('_')[1] || req.user.name != req.params.link.split('_')[2]) && (req.user.level != 10)){        
            res.redirect('/')
           }else{
            let fileExtension = req.params.file.split('.');
            fileExtension = fileExtension[fileExtension.length -1];
            DocumentManipulator.removeDocument(`upload/${req.params.year}/${req.params.link}/${req.params.file}`);
            res.redirect(`/meusprocessos/${req.params.year}/${req.params.link}`);
           }      
        
    } catch (error) {
        res.send('error' + error)        
    }
});

router.get('/:year/:link/:file', (req, res) =>{
    try {
        if((req.user.level != req.params.link.split('_')[0] || req.user.section != req.params.link.split('_')[1] || req.user.name != req.params.link.split('_')[2]) && (req.user.level != 10)){
            res.redirect('/') 
        }else{
            let doc = DocumentManipulator.readDocument(`upload/${req.params.year}/${req.params.link}/${req.params.file}`);
            res.end(doc);
        }        
    } catch (error) {
        res.redirect('/')        
    }    
});

router.post('/:year/:link/', uploadFile,(req,res) =>{
    try {
        if((req.user.level != req.params.link.split('_')[0] || req.user.section != req.params.link.split('_')[1] || req.user.name != req.params.link.split('_')[2]) && (req.user.level != 10)){
            res.redirect('/') 
        }else{                      
            res.redirect(`/meusprocessos/${req.params.year}/${req.params.link}`);
        }        
    } catch (error) {
        res.redirect(301, `/meusprocessos/${req.params.year}/${req.params.link}`, {error: 'Arquivo ultrapassa o limite de 60MB'})        
    }        
});


module.exports= router;