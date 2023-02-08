import {createElements, createContainer, setAttributes,clearContainer, appendElements} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

window.addEventListener('load', async() => {
    try {
        const [documents, process] = await getDocuments();
        const filesElements = generateFiles(documents, process);
        const statesElements = listStates(process.process, process.states);
        generetaTitle(process.process); 
        upload(process.process);
        sendProcess(process.process);

        if(filesElements.length > 0){
            generateListClickListener(filesElements);
        }
        generateStatesClickListener(statesElements)
        
    } catch (error) {
        console.log(error);
    }
});

document.addEventListener('click', (e) => {
    const element = e.target;
    const url = `/${document.URL.split('/')[3]}/${document.URL.split('/')[4]}/${document.URL.split('/')[5]}`;
    const processTitle = document.getElementById('processtitle').innerHTML;
    const statusButton = document.getElementById('statusbutton');
    const newStatusButton = document.getElementById('newstatusbutton');
    const sendFile = document.getElementById('sendfile');
    const sendButton =  document.getElementById('sendbutton');

    if(element === newStatusButton){
        const newStatusForm =  document.getElementById('newstatusform');            
        newStatusForm.setAttribute('method', 'POST');
        newStatusForm.setAttribute('action', `${url}anotation/${processTitle}`);
    }
    if(element === statusButton){
        e.preventDefault();
        const states = document.getElementById('states');      
        
        if(states.getAttribute('class') == 'display_none'){
            states.setAttribute('class', '');
            statusButton.textContent = '-';                               
        }else{
            states.setAttribute('class', 'display_none');
            statusButton.textContent = '+';                               
        }
    }
    if(element === sendFile){
        const uploadForm = document.getElementById('upload');
        setAttributes(uploadForm, {action: `${url}upload/${getLocal()}`, method: 'POST', enctype: 'multipart/form-data'});
    }
    if(element === sendButton){
        const forms = document.getElementById('sendprocess');
        setAttributes(forms, {method: 'POST', action: '/mensageiro/nova/'});        
    }
});

function generateListClickListener(filesElements){
    for(let a of filesElements){
        const [editButton, deleteButton, file, div1, div2, div3, form, elements] = a;
        document.addEventListener('click', (e) => {
            const element = e.target;
            const url = `/${document.URL.split('/')[3]}/${document.URL.split('/')[4]}/${document.URL.split('/')[5]}`;        
    
            if(element === editButton){
                e.preventDefault();                
                const editFieldMessage =  document.createElement('p');
                const editField = createElements('input', {type: 'text', name: 'ename', class: 'mediumtext', value: (elements.name).split('.')[0]});
                const sendEdit = createElements('input', {type: 'submit', class: 'button', value: 'Ok'});
                const cancelEdit = createElements('input', {type: 'submit', class: 'redbutton', value: 'Cancelar'});
                appendElements(div1, [editFieldMessage, editField, sendEdit, cancelEdit]);
                div2.setAttribute('class', 'display_none');
    
                sendEdit.addEventListener('click', (e) =>{                   
                    if(editField.value.includes('_') || editField.value.includes('.') || editField.value == ''){
                        e.preventDefault();
                        editFieldMessage.textContent = 'Este campo deve ser preenchido e não aceita os caracteres: "_" , "."';
                    }else{
                    form.setAttribute('method', 'POST');
                    form.setAttribute('action', `${url}edit/${elements.name}`);
                    form.setAttribute('target', '');
                    }                   
                });
                
                cancelEdit.addEventListener('click', (e) =>{
                    e.preventDefault();
                    editFieldMessage.textContent = '';              
                    clearContainer(div1);
                    div2.setAttribute('class', 'flexorientation--spaceb');
                });               
            }
            if(element === deleteButton){
                e.preventDefault();
                form.setAttribute('class', 'list_iten_delete');
                const deleteText = createElements('p', {}, `Tem certeza que deseja apagar: <b>${elements.name}</b>?`);
                const sendDelete = createElements('input', {type: 'submit', class:'button', value: 'Ok'});
                const cancelDelete = createElements('input', {type: 'submit', class: 'redbutton', value: 'Cancelar'});
                appendElements(div3, [deleteText, sendDelete, cancelDelete]);
                div2.setAttribute('class', 'display_none');
    
                sendDelete.addEventListener('click', () =>{
                    form.setAttribute('method', 'POST');
                    form.setAttribute('action', `${url}delete/${elements.name}`);
                    form.setAttribute('target', '');
                });
    
                cancelDelete.addEventListener('click', (e) =>{
                    e.preventDefault();               
                    form.setAttribute('class', 'list_iten');
                    clearContainer(div3);
                    div2.setAttribute('class', 'flexorientation--spaceb');                    
                });
            }
            if(element === file){
                form.setAttribute('target', '_blank');
                form.setAttribute('method', 'POST');
                form.setAttribute('action', `${url}${elements.name}`);
            }        
        });
    }    
}

function generateStatesClickListener(statesElements){
    for(let a of statesElements){
        const [deleteState, block] = a;
        const url = `/${document.URL.split('/')[3]}/${document.URL.split('/')[4]}/${document.URL.split('/')[5]}`;
        const processTitle = document.getElementById('processtitle').innerHTML;
    
        deleteState.addEventListener('click', () => {
            block.setAttribute('method', 'POST');
            block.setAttribute('action', `${url}anotation/${processTitle}/delete`);     
        });
    }
}

function getLocal(){
    const local = document.URL.split('/')[3]
    if(local === 'meusprocessos'){
        return 'inProcess';
    }
    if(local === 'processosrecebidos'){
        return 'inTransfer';
    }
    if(local === 'teste'){
        return 'inProcess';
    }
}

async function getDocuments(){
    try {
        const documents = await request({
            method: 'POST',
            url: '/teste/documents',
            params: `year=${document.URL.split('/')[4]}&link=${document.URL.split('/')[5]}&local=${getLocal()}`
        });
        const process = await request({
            method: 'POST',
            url: '/teste/process',
            params: `year=${document.URL.split('/')[4]}&link=${document.URL.split('/')[5]}`
        });                              
        return [documents, process];

    } catch (error) {
        console.log(error);
    }
}

function generateFiles(documents, process){
    const list = document.getElementById('list');
    
    if(documents.length > 0){
        const elementsArray = [];
        for(let i of documents){
            const file = createElements('input', {type: 'submit', class: 'transparentbutton highlighted', value: i.name});
            const [editButton, deleteButton] = generateProcessButtons(process.process);
            const buttonsDiv = createContainer('div', {}, [editButton, deleteButton]);
            const div1 = createContainer('div', {}, []);
            const div2 = createContainer('div', {class: 'flexorientation--spaceb'}, [file, buttonsDiv]);
            const div3 = createContainer('div', {}, []);
            const form = createContainer('form', {class: 'list_iten'}, [div1, div2, div3]);
            list.appendChild(form);           
            elementsArray.push([editButton, deleteButton, file, div1, div2, div3, form, i])
        }
        return elementsArray;
    }else{
        const text = createElements('p', {}, 'Não existem documentos dentro deste processo.');
        list.appendChild(text);
        return [];
    }
}

function generetaTitle(process){
    const divTitle = document.getElementById('processinfo');
    const Title = createElements('h2',{id: 'processtitle'}, process.title);
    const Date = createElements('small', {id: 'processdate'}, process.date);
    appendElements(divTitle, [Title, Date]);
}

function generateProcessButtons(process){    
    if(process.transfer_dir === null  && process.done_dir === null){
        const editButton = createElements('input', {type: 'submit', class: 'button', value: 'Renomear'});
        const deleteButton = createElements('input', {type: 'submit', class: 'redbutton', value: 'Apagar'});
        return [editButton, deleteButton];
    }else{
        const editButton = createElements('input', {type: 'submit', class: 'button_disable', value: 'Renomear', disabled: ''});
        const deleteButton = createElements('input', {type: 'submit', class: 'button_disable', value: 'Apagar', disabled: ''});
        return [editButton, deleteButton];
    }  
}

function upload(process){    
    const uploadForm = document.getElementById('upload');
    const message = document.getElementById('message');
    const fileLabel = createElements('label', {for: 'file', class: 'button_file', id: 'button_file'}, 'Upload');
    const inputFile =  createElements('input', {type: 'file', id: 'file', name: 'file', value: '', required: ''});
    const spanName = createElements('span', {id: 'filename', required: ''});
    appendElements(uploadForm, [fileLabel, inputFile, spanName]);

    if(process.transfer_dir === null  && process.done_dir === null){
        const sendFile = document.createElement('input');

        inputFile.addEventListener('change', () => {
            sendFile.setAttribute('id', 'sendfile');
            let text = inputFile.value.split("\\");
            let extension = text[2].split('.')[text[2].split('.').length -1];
            const extensionArray = ['txt', 'xlsx', 'pdf', 'docx', 'doc', 'jpg', 'jpeg', 'ods', 'zip', 'rar', 'jar', 'png'];
            spanName.textContent = text[2];
            if(extensionArray.some( x => x === extension.toLowerCase())){
                setAttributes(sendFile, {type: 'submit', class: 'button', value: 'Enviar'});
                uploadForm.appendChild(sendFile);                              
            }else{
                if(uploadForm.querySelector('#sendfile') != null){                
                    uploadForm.removeChild(sendFile);
                } 
                message.innerHTML = 'Só é possível fazer upload de arquivos: pdf, ods, xlsx, docx, doc, jpg, jpeg, png, ods e arquivos compactados em até 60MB'; 
            }
        });
    }else{
        fileLabel.setAttribute('class', 'button_disable');
        fileLabel.setAttribute('disable', '');
        inputFile.setAttribute('type', '');
    }  
}

function listStates(process, processStates){
    const buttonDiv =  document.getElementById('statusbuttondiv');
    const states = document.getElementById('states');
    const smallButton = createElements('small', {}, 'Status');
    const statusButton = createElements('button', {class: 'button', id: 'statusbutton'}, '+');
    const newStatusForm = createElements('form', {id: 'newstatusform',style: 'margin-top: 34px;'});
    
    appendElements(buttonDiv, [smallButton, statusButton]);

    if(process.transfer_dir === null  && process.done_dir === null){
        const newStatus = createElements('input', {type: 'submit', class: 'button', value: 'Novo Status', id: 'newstatusbutton'});
        const elementID = createElements('input', {type: 'hidden', name: 'elementid', value: process.id});
        appendElements(newStatusForm, [newStatus, elementID]);
    }
    const blocks = generateStatesBlocks(process, processStates, states);
    states.setAttribute('class', 'display_none');
    return blocks;
}

function generateStatesBlocks(process, processStates, states){
    const elementsArray = [];
    for(let i of processStates){
        const label1 = createElements('label', {}, 'Observação');
        const label2 = createElements('label', {}, 'Status');
        const stateId = createElements('input', {type: 'hidden', name: 'elementid', value: i.id});
        const deleteState = createElements('input', {type: 'submit', class: 'transparentbutton', value: 'Apagar'});
        const prgh1 = createElements('p', {}, i.anotation);
        const prgh2 = createElements('p', {}, i.state);
        const date = createElements('small', {}, i.date);
        const div1 = createContainer('div', {class: 'flexorientation--start'}, [label1, prgh1]);
        const div2 = createContainer('div', {class: 'flexorientation--start'}, [label2, prgh2]);
        const div3 = createContainer('div', {}, [date]);
        const block = createContainer('form', {class: 'status_content display-column-spaceb', name: 'statusblock'}, [div1, div2, div3, stateId]);
        
        if(process.transfer_dir === null  && process.done_dir === null && i.state != 'Em transferência'){
            block.appendChild(deleteState);
        }
        states.appendChild(block);        
       elementsArray.push([deleteState, block]);
    }
    return elementsArray;
}

function sendProcess(process){
    const sendButton = createElements('input', {type: 'submit', id: 'sendbutton',class: 'arrow', value: 'Enviar'});
    const forms = document.getElementById('sendprocess');
    const idI =  createElements('input', {type: 'hidden', name: 'id', value: process.id});
    const titleI =  createElements('input', {type: 'hidden', name: 'title', value: process.title});
    const yearI = createElements('input', {type: 'hidden', name: 'year', value: process.year});
    appendElements(forms, [sendButton, idI, titleI, yearI]);
    if(process.transfer_dir === null  && process.done_dir === null){
        setAttributes(sendButton, {type: 'submit', class: 'arrow', value: 'Enviar'});
    }else{
        setAttributes(sendButton, {type: 'submit', class: 'arrow_disabled', value: 'Enviar', disabled: ''});        
    }    
}