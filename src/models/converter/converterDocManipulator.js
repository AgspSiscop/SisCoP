const fs =  require('fs');
const multer = require('multer');

class DocumentManipulator  {

    constructor(files){
        this.files = files;
        this.path = this.#generatePath();
        this.filenames = this.#getFilenames();
        this.contents = this.#getContents();        
    }

    #generatePath(){
        const path = `./conversor/${this.files[0].process}/`;
        return path;
    }

    #getContents(){
        const arrayBuffer = [];
        for(let buffer of this.files){
            arrayBuffer.push(buffer.file);
        }
        return arrayBuffer;
    }
    
    #getFilenames(){
        const arrayNames = [];        
        for(let file of this.files){            
            const filename  = file.filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9/ ]/g, "");
            arrayNames.push(`${filename}${file.extension}`);
        }
        
        return arrayNames;
    }

    #makeDir = dir => new Promise((resolve, reject) => {
        fs.mkdir(dir, {recursive: true}, (error, content) => {
            if(error){
                reject(error);
            }else{
                resolve();
            }
        });
    });

    #writeFile = (dir, data) => new Promise((resolve, reject) => {
        fs.writeFile(dir, data, (error, content) => {
            if(error){
                reject(error);
            }else{
                resolve(dir);
            }
        });
    });    

    #readDocument = dir => new Promise((resolve, reject) => {        
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
    
    #removeProcess = dir => new Promise((resolve, reject) => {
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
    
    async generateFiles(){
        try {
            const paths = [];
            await this.#makeDir(this.path);
            for(let i = 0; i < this.files.length; i++){                
                paths.push(await this.#writeFile(`${this.path}${this.filenames[i]}`, this.contents[i]));
            }
            return paths;          
        } catch (error) {
            throw new Error(error);            
        }
    }

    async deleteDocs(){
        try {
            await this.#removeProcess(this.path);
            
        } catch (error) {
            throw new Error(error)            
        }
    }

    async readDocument(pdf){
        try {
            
            const read = await this.#readDocument(pdf);
            const filename = pdf.split('/')[pdf.split('/').length -1];
            return {file: read, filename: filename, id: this.files[0].process};            
        } catch (error) {
            throw new Error(error)
        }
    } 
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