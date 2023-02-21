const fs =  require('fs');
const multer = require('multer');
const fsExtra = require('fs-extra');

/*class DocumentManipulator  {

    static makeDir = dir => new Promise((resolve, reject) => {
        fs.mkdir(dir, {recursive: true}, (error, content) => {
            if(error){
                reject(error);
            }else{
                resolve();
            }
        })
    })
        
    static readDir = dir => new Promise((resolve, reject) => {
        fs.readdir(dir, (error, content) => {
            if(error){
                if(error.code = 'ENOENT'){
                    const documentError = new DocumentError('PROCESSO NÃO ENCONTRADO.',);
                    reject(documentError);                    
                }else{
                    reject(error);
                }
            }else{                
                const array = [];
                for(let a of content){
                    array.push({name: a});
                }
                resolve(array)
            }
        });
    });    
    
    static rename = (dir, name) => new Promise((resolve, reject) => {
        fs.rename(dir, name, (error, content) => {
            if(error){
                if(error.code = 'ENOENT'){
                    const documentError = new DocumentError('PROCESSO NÃO ENCONTRADO.',);
                    reject(documentError);                    
                }else{
                    reject(error);
                }
            }else{
                resolve(content)
            }
        });        
    });
    
    static readDocument = dir => new Promise((resolve, reject) => {        
        fs.readFile(dir, (error, content) => {
            if(error){
                if(error.code = 'ENOENT'){
                    const documentError = new DocumentError('ARQUIVO NÃO ENCONTRADO.',);
                    reject(documentError);                    
                }else{
                    reject(error);
                }
            }else{
                resolve(content)
            }
        });
    });
    
    static removeProcess = dir => new Promise((resolve, reject) => {
        fs.rm(dir, {recursive: true}, (error, content) => {
            if(error){
                if(error.code = 'ENOENT'){
                    const documentError = new DocumentError('PROCESSO NÃO ENCONTRADO.',);
                    reject(documentError);                    
                }else{
                    reject(error);
                }
            }else{
                resolve()
            }
        });
    });
    
    static removeDocument = dir => new Promise((resolve, reject) => {
        fs.rm(dir, (error, content) => {
            if(error){
                if(error.code = 'ENOENT'){
                    const documentError = new DocumentError('ARQUIVO NÃO ENCONTRADO.',);
                    reject(documentError);                    
                }else{
                    reject(error);
                }
            }else{
                resolve()
            }
        });
    });
    
    static copy = (src, dest) => new Promise((resolve, reject) => {        
        fsExtra.copy(src, dest, (error, content) => {
            if(error){
                reject(error)
            }else{
                resolve()
            }
        });        
    });   
}*/

/*const storage = multer.diskStorage({
    
    destination: function(req, file, cb){              
        cb(null,`upload/${req.params.local}/${req.params.year}/${req.params.link}`);
    },

    filename: function(req, file, cb){
        let originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        let clearName = originalName.slice(0, originalName.lastIndexOf('.')).replace(/\./g, ' ');
        let extension = originalName.slice(originalName.lastIndexOf('.', originalName.length-1));
        let name = clearName + extension

        cb(null, name.replace(/\_/g, ' '));
             
    }
});*/


function setHeader(extension){
    if(extension.toLowerCase() === '.doc' || extension.toLowerCase() === '.docx' || extension.toLowerCase() === '.txt'){
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
    if(extension.toLowerCase() === '.xlsx'){
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
    if(extension.toLowerCase() === '.ods'){
        return 'application/vnd.oasis.opendocument.spreadsheet'
    }
    if(extension.toLowerCase() === '.odt'){
        return 'application/vnd.oasis.opendocument.text'
    }
    if(extension.toLowerCase() === '.zip'){
        return 'application/zip'
    }
    if(extension.toLowerCase() === '.rar'){
        return 'application/x-rar-compressed'
    }
    if(extension.toLowerCase() === '.tar'){
        return 'application/x-tar'
    }
    if(extension.toLowerCase() === '.pdf'){
        return 'application/pdf'
    }
    if(extension.toLowerCase() === '.png'){
        return 'image/png'
    }else{
        return ''
    }
    
}


const storage = multer.memoryStorage({
    originalName: function(req, file, cb){
        let originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        let clearName = originalName.slice(0, originalName.lastIndexOf('.')).replace(/\./g, ' ');
        let extension = originalName.slice(originalName.lastIndexOf('.', originalName.length-1));
        let name = clearName + extension

        cb(null, name.replace(/\_/g, ' '));             
    }
});



const multerConfig = multer({limits:{fileSize: 6021505, files: 15}, storage});

function uploadFile(req, res, next) {
    const upload = multerConfig.fields([{name:'file',maxCount:15}]);
    upload(req, res, function (err) {
        if (err) {
            if(err.message == 'File too large'){               
                req.session.error = 'Arquivo ultrapassa o limite de 60MB' //mudar isso
            }else{
                if(req.baseUrl == '/meusprocessos'){
                    res.redirect(`/meusprocessos/${req.params.year}/${req.params.link}`);
                }
                if(req.baseUrl == '/processosrecebidos'){
                    res.redirect(`/processosrecebidos/${req.params.year}/${req.params.link}`);
                }
            }            
        }     
        next()
    })
}

function uploadAsync(req,res){
    const upload = multerConfig.fields([{name:'file',maxCount:15}]);    
    return new Promise(function(resolve,reject){
         upload(req,res,function(err){
            if (err) {
                if(err.message == 'File too large'){               
                    req.session.error = 'Arquivo ultrapassa o limite de 60MB' //mudar isso
                }else{
                    reject(err)
                }            
            }
             resolve(req.files);
         });
    });
}

/*class DocumentError extends Error{
    constructor(msg, code){
        super(msg);
        this.name = 'DocumentError';
        this.statusCode = code || null;
    }
}*/

module.exports = {uploadAsync, setHeader};