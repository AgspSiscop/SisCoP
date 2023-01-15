const fs =  require('fs');
const fsExtra = require('fs-extra');

class DocumentManipulator  {   
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
    }) 
    
    static copy(src, dest){        
        fsExtra.copy(src, dest, ()=>{})
    }
}

module.exports = {DocumentManipulator};