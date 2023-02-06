const {exec} = require('child_process');
const fs = require('fs');

class ConverterAndMerger{
    constructor(file, path){
        this.file = file;
        this.path = path
        this.filesPath = this.#pathTratament();
    }

    #pathTratament(){
        let filesPath = []
        if(typeof(this.file) == 'string'){
            this.file = [this.file];            
        }
        for(let i of this.file){
            if(i[0] !== '.' && i[1] !== '/'){
                filesPath.push(`"./${i}"`);
            }else{
                filesPath.push(`"${i}"`);
            }
        }
        return filesPath
    }

    #pathOfPdfs(){
        let filesPath = []
        for(let i of this.file){
            if(i[0] !== '.' && i[1] !== '/'){
                filesPath += `"./${i.split('.')[0]}.pdf" `
            }else{
                filesPath += `"${i.split('.')[0]}.pdf" `
            }
        }
        return filesPath
    }

    #converter = (file) => new Promise((resolve, reject) => {             
        exec(`libreoffice --convert-to pdf --outdir "${this.path}" ${file}`, (error, stdout, stderr) => {
            if(error){
                reject(error);
            }
            if(stderr){
                resolve(stderr);
            }
            if(stdout){
                resolve(stdout);
            }
        })
    });

    #merger = () => new Promise((resolve, reject) => {       
        exec(`pdftk ${this.#pathOfPdfs()} output "${this.path}/Processo${Date.now()}.pdf"`, (error, stdout, stderr) =>{
            if(error){
                reject(error);
            }
            if(stderr){
                reject(stderr);
            }
            resolve()
        });
    });

    #deletefiles = (file) => new Promise((resolve, reject) => {
        fs.rm(file, (error, content) => {
            if(error){
                if(error.code = 'ENOENT'){                    
                    reject('ARQUIVO NÃO ENCONTRADO.');                    
                }else{
                    reject(error);
                }
            }else{
                resolve()
            }
        });
    })

    async converter(){
        try {
            if(this.filesPath.length == 1){
                await this.#converter(this.filesPath[0]);
                return 
            }
            if(this.filesPath.length > 1){
                for(let document of this.filesPath){
                    await this.#converter(document);                    
                }
                await this.#merger();
                for(let pdfs of this.filesPath){                                   
                   await this.#deletefiles(`.${pdfs.split('.')[1]}.pdf`);
                }
                return
            }
        } catch (error) {
            throw new Error(error);            
        }
    }

}

module.exports = ConverterAndMerger
