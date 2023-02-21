import {setAttributes, createElements} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

async function getValue(){
    try {
        const processName = document.getElementById('process');        
        const process = await request({
            method: 'POST',
            url: '/requests/processinmessage',
            params: `process=${processName.value}`
        })
        generateLink(process);
    } catch (error) {
        console.log(error);
    }
}

function generateLink(process){    
    const processmessage = document.getElementById('processmessage');
    const processNameL = document.createElement('label');
    const processNameButton = createElements('button', {class: 'transparentbutton process_link'})
    if(process !== null){        
        setAttributes(processmessage, {method: 'POST', action: `/processosrecebidos/${process.year}/${process._id}`});
        processNameButton.innerHTML = process.title;
        processmessage.appendChild(processNameButton);        
    }else{
        const processNameH = document.getElementById('processname');
        processNameL.innerHTML = `${processNameH.value}`;
        processmessage.appendChild(processNameL);
    }
}

getValue();
