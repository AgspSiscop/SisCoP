const express =  require('express');
const xlsx =  require('xlsx');
const pdfmake = require('pdfmake');
const fs =  require('fs');

const router = express.Router();

function process(dir, level, section, name){
    let acess =  `${level}_${section}_${name}_`;
    let documentsList = fs.readdirSync(dir);
    let array = [];       
    
    if(level == 1){
        for(let a of documentsList){
            if(a.slice(0, acess.length) == acess){
                array.push({name: a}) 
            }           
        }
    }else{
        for(let a of documentsList){
            array.push({name: a}) 
        }
    }    
    /*for(let a of documentsList){
        
        array.push({name: a.replace(acess, '')}) //frontend faz o replace
    }*/
    return array
}

router.get('/', (req, res) => {
    //`upload/${(new Date).getFullYear()}/${req.user.level + '_' + req.user.section + '_' + req.user.name + '_' + req.body.object}/Termo de Referência.pdf`    
    let documents = process(`upload/2022/`,req.user.level,req.user.section,req.user.name);   
    res.render('document_reader/document_reader', {documents: documents});
})





module.exports= router;