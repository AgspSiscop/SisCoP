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
        generateLink(process);
    } catch (error) {
        console.log(error);
    }
}

function generateLink(process){    
    if(process){
        setAttributes(document.getElementById('processmessage'), {method: 'POST', action: `/processosrecebidos/${process.year}/${process.transfer_dir}`});
    }
}

getValue();
