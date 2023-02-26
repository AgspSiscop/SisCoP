const multer = require('multer');

const storage = multer.memoryStorage({
    originalName: function(req, file, cb){
        let originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        let clearName = originalName.slice(0, originalName.lastIndexOf('.')).replace(/\./g, ' ');
        let extension = originalName.slice(originalName.lastIndexOf('.', originalName.length-1));
        let name = clearName + extension

        cb(null, name.replace(/\_/g, ' '));             
    }
});

const multerConfig = multer({limits:{fileSize: 421505}, storage});


function uploadAsync(req,res){
    const upload = multerConfig.single('file');    
    return new Promise(function(resolve,reject){
         upload(req,res,function(err){
            if (err) {
                if(err.message == 'File too large'){               
                    req.session.error = 'Arquivo ultrapassa o limite de 4MB' //mudar isso
                }else{
                    reject(err)
                }            
            }            
             resolve(req.file);
         });
    });
}

module.exports = uploadAsync