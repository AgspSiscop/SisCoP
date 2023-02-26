const multer = require('multer');

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

module.exports = {uploadAsync, setHeader};