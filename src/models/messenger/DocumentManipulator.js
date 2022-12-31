const fs =  require('fs');
const fsExtra = require('fs-extra')
const multer = require('multer');

class DocumentManipulator  {   
    static readDir(dir){    
        let documentsList = fs.readdirSync(dir);
        let array = [];   
        
        for(let a of documentsList){
            array.push({name: a}) 
        }        
        return array
    }
    
    static rename(dir, name){
        fs.renameSync(dir, name)
    }
    
    static readDocument(dir){
        return fs.readFileSync(dir)
    }
    
    static removeProcess(dir){    
        fs.rmdirSync(dir, {recursive: true})
    }
    
    static removeDocument(dir){
        fs.rm(dir, () =>{});
    } 
    
    static copy(src, dest){        
        fsExtra.copy(src, dest, ()=>{})
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
const multerConfig = multer({limits:{fileSize: 6021505}  , storage});

function uploadFile(req, res, next) {
    const upload = multerConfig.single('file');

    upload(req, res, function (err) {
        if (err) {
            if(err.message == 'File too large'){               
                req.session.error = 'Arquivo ultrapassa o limite de 60MB' //mudar isso
            }else{
                res.redirect(`/meusprocessos/${req.params.year}/${req.params.link}`);
            }            
        }     
        next()
    })
}

module.exports = {DocumentManipulator, uploadFile};