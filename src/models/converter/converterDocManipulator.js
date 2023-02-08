const fs =  require('fs');
const multer = require('multer');

class DocumentManipulator  {

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
}

const storage = multer.diskStorage({
    
    destination: function(req, file, cb){              
        cb(null,`upload/${req.params.local}/${req.params.year}/${req.params.link}`);
    },

    filename: function(req, file, cb){        
        cb(null, file.originalname);
             
    }
})
const multerConfig = multer({limits:{fileSize: 6021505}, storage});

function uploadAsync(req,res){
    const upload = multerConfig.fields([{name: 'file', maxCount: 10}])
    return new Promise(function(resolve,reject){
         upload(req,res,function(err){
            if (err) {
                if(err.message == 'File too large'){               
                    req.session.error = 'Arquivo ultrapassa o limite de 60MB' //mudar isso
                }else{
                    reject(err)
                }            
            }
             resolve();
         });
    });
}

class DocumentError extends Error{
    constructor(msg, code){
        super(msg);
        this.name = 'DocumentError';
        this.statusCode = code || null;
    }
}

module.exports = {DocumentManipulator, uploadAsync};