import {setAttributes} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

async function getValue(){
    try {
        const processName = document.getElementById('process');        
        const process = await request({
            method: 'POST',
            url: '/mensageiro/process',
            params: `process=${processName.value}`
        })
        await generateLink(process);
    } catch (error) {
        console.log(error);
    }
}

async function generateLink(process){      
    if(process){
        if(process.done === true){
            document.getElementById('processbutton').innerHTML += ' (Concluído)';
        }else{
            setAttributes(document.getElementById('processmessage'), {method: 'POST', action: `/processosrecebidos/${process.year}/${process.transfer_dir}`});
        }
    }
}

getValue();
