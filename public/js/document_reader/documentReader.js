import {createElements, createContainer, setAttributes, clearContainer, appendElements} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

window.addEventListener('load', () => {
    getDocuments();    
});

document.addEventListener('click', (e) => {
    const element = e.target;
    const url = `/${document.URL.split('/')[3]}/${document.URL.split('/')[4]}/${document.URL.split('/')[5]}`;
    const processInfo  = `${document.URL.split('/')[4]}/${document.URL.split('/')[5]}`;
    const local = getLocal();
    const processTitle = document.getElementById('processtitle').innerHTML;
    const statusButton = document.getElementById('statusbutton');
    const descriptionButton = document.getElementById('descriptionbutton');
    const newStatusButton = document.getElementById('newstatusbutton');
    const sendFile = document.getElementById('sendfile');
    const sendButton =  document.getElementById('sendbutton');
    const conversor =  document.getElementById('conversor');
    const doneProcess = document.getElementById('doneprocess');
    const returnProcess = document.getElementById('returnprocess');
    const optionsForm = document.getElementById('endprocess');       

    if(element === newStatusButton){
        const newStatusForm =  document.getElementById('newstatusform');            
        newStatusForm.setAttribute('method', 'POST');
        newStatusForm.setAttribute('action', `${url}/anotation/${processTitle}`);
    }
    if(element === statusButton || element.parentElement === statusButton){
        e.preventDefault();
        const states = document.getElementById('states');      
        
        if(states.getAttribute('class') == 'display_none'){
            states.setAttribute('class', 'states_list');
            statusButton.innerHTML = '<img src="/img/up.png" style="width: 9px;"/>';                               
        }else{
            states.setAttribute('class', 'display_none');
            statusButton.innerHTML = '<img src="/img/down.png" style="width: 9px;"/>';                               
        }
    }
    if(element === descriptionButton || element.parentElement === descriptionButton){
        e.preventDefault();        
        const descriptions = document.getElementById('descriptions');
        if(descriptions.getAttribute('class') == 'display_none'){
            descriptions.setAttribute('class', 'description_list');
            descriptionButton.innerHTML = '<img src="/img/up.png" style="width: 9px;"/>';
        }else{
            descriptions.setAttribute('class', 'display_none');
            descriptionButton.innerHTML = '<img src="/img/down.png" style="width: 9px;"/>';
        }
    }
    if(element === sendFile){
        const uploadForm = document.getElementById('upload');
        setAttributes(uploadForm, {action: `${url}/upload/${local}`, method: 'POST', enctype: 'multipart/form-data'});
    }
    if(element === sendButton || element.parentElement === sendButton){
        const forms = document.getElementById('sendprocess');
        setAttributes(forms, {method: 'POST', action: '/mensageiro/nova/'});        
    }
    if(element === conversor){        
        setAttributes(optionsForm, {method: 'POST', action: `/conversor/arquivos/${processInfo}/${processTitle}/${local}`});
    }
    if(element === doneProcess){        
        setAttributes(optionsForm, {method: 'POST', action: `/concluidos/${processInfo}/${local}/done/process`});
    }
    if(element === returnProcess){
        setAttributes(optionsForm, {method: 'POST', action: `/concluidos/${processInfo}/${local}/return/process`});
    }    
});

function generateListClickListener(editButton, deleteButton, file, div1, div2, div3, form, elements){
    document.addEventListener('click', (e) => {
        const element = e.target;
        const url = `/${document.URL.split('/')[3]}/${document.URL.split('/')[4]}/${document.URL.split('/')[5]}`;        

        if(element === editButton){
            e.preventDefault();                
            const editFieldMessage =  document.createElement('p');
            const editField = createElements('input', {type: 'text', name: 'ename', class: 'mediumtext', value: (elements.filename)});
            const sendEdit = createElements('input', {type: 'submit', class: 'button', value: 'Ok'});
            const cancelEdit = createElements('input', {type: 'submit', class: 'redbutton', value: 'Cancelar'});
            appendElements(div1, [editFieldMessage, editField, sendEdit, cancelEdit]);
            div2.setAttribute('class', 'display_none');

            sendEdit.addEventListener('click', (e) =>{                   
                if(editField.value.includes('\\') || editField.value.includes('/') || editField.value.includes('_') || editField.value.includes('.') || editField.value == ''){
                    e.preventDefault();
                    editFieldMessage.textContent = 'Este campo deve ser preenchido e não aceita os caracteres: "_" , ".", "/", "\\"';
                }else{
                form.setAttribute('method', 'POST');
                form.setAttribute('action', `${url}/edit/${elements._id}`);
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
            const deleteText = createElements('p', {}, `Tem certeza que deseja apagar: <b>${elements.filename}</b>?`);
            const sendDelete = createElements('input', {type: 'submit', class:'button', value: 'Ok'});
            const cancelDelete = createElements('input', {type: 'submit', class: 'redbutton', value: 'Cancelar'});
            appendElements(div3, [deleteText, sendDelete, cancelDelete]);
            div2.setAttribute('class', 'display_none');

            sendDelete.addEventListener('click', () =>{
                form.setAttribute('method', 'POST');
                form.setAttribute('action', `${url}/delete/${elements._id}`);
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
            form.setAttribute('action', `${url}/${elements._id}`);
        }        
    });
}

function generateStatesClickListener(deleteState, block){
    const url = `/${document.URL.split('/')[3]}/${document.URL.split('/')[4]}/${document.URL.split('/')[5]}`;
    const processTitle = document.getElementById('processtitle').innerHTML;

    deleteState.addEventListener('click', () => {
        block.setAttribute('method', 'POST');
        block.setAttribute('action', `${url}/anotation/${processTitle}/delete`);     
    });
}

async function getDocuments(){
    try {
        const local = getLocal();              
        const process = await request({
            method: 'POST',
            url: `/requests/${local}/process`,
            params: `year=${document.URL.split('/')[4]}&id=${document.URL.split('/')[5]}`
        });
        if(process){
            const documents = await request({
                method: 'POST',
                url: `/requests/documents`,
                params: `id=${document.URL.split('/')[5]}`
            });               
            generateElements(documents, process);
        }                           
    } catch (error) {
        console.log(error);
    }
}

function generateElements(documents, process){
    generetaTitle(process.process);
    generateFiles(documents, process.process);
    upload(process.process, 0);
    generateDescription(process.process);  
    listStates(process.process, process.states, process.user);
    sendProcess(process.process);
    generateOptions(process.process);
}

function getLocal(){
    const local = document.URL.split('/')[3]
    if(local === 'meusprocessos'){
        return 'myprocess';
    }
    if(local === 'processosrecebidos'){
        return 'processreceived';
    }
    if(local === 'concluidos'){
        return 'processdone'
    }
}

function generateFiles(documents, process){
    const list = document.getElementById('list');
    if(documents.length > 0){
        for(let i of documents){
            const file = createElements('input', {type: 'submit', class: 'transparentbutton highlighted', value: `${i.filename}${i.extension}`});
            const [editButton, deleteButton] = generateFilesButtons(process);
            const buttonsDiv = createContainer('div', {}, [editButton, deleteButton]);
            const div1 = createContainer('div', {}, []);
            const div2 = createContainer('div', {class: 'flexorientation--spaceb'}, [file, buttonsDiv]);
            const div3 = createContainer('div', {}, []);
            const form = createContainer('form', {class: 'list_iten'}, [div1, div2, div3]);
            list.appendChild(form);
            generateListClickListener(editButton, deleteButton, file, div1, div2, div3, form, i);
        }
    }else{
        const text = createElements('p', {}, 'Não existem documentos dentro deste processo.');
        list.appendChild(text);
    }
}

function generetaTitle(process){
    const divTitle = document.getElementById('processinfo');
    const Title = createElements('h2',{id: 'processtitle'}, process.title);
    const Date = createElements('small', {id: 'processdate'}, process.date);
    appendElements(divTitle, [Title, Date]);
}

function generateFilesButtons(process){    
    if(process.done === false){
        const editButton = createElements('input', {type: 'submit', class: 'button', value: 'Renomear'});
        const deleteButton = createElements('input', {type: 'submit', class: 'redbutton', value: 'Apagar'});
        return [editButton, deleteButton];
    }else{
        const editButton = createElements('input', {type: 'submit', class: 'button_disable', value: 'Renomear', disabled: ''});
        const deleteButton = createElements('input', {type: 'submit', class: 'button_disable', value: 'Apagar', disabled: ''});
        return [editButton, deleteButton];
    }
}

function upload(process, index){    
    const uploadForm = document.getElementById('upload');    
    const message = document.getElementById('message');
    const fileLabel = createElements('label', {for: `file${index}`, class: 'button_file', id: 'button_file'}, 'Upload');
    const inputFile =  createElements('input', {type: 'file', id: `file${index}`, name: 'file', class: 'file', value: '', required: '', multiple: ''});
    const spanName = createElements('span', {class: 'filename', required: ''});    
    const uploadDiv = createContainer('div', {style: 'margin-top: 15px;'}, [fileLabel, inputFile, spanName]);   
    uploadForm.prepend(uploadDiv);
    
    if(process.done === false){
        const sendFile = document.createElement('input');

        inputFile.addEventListener('change', () => {
            message.innerHTML = ' '
            sendFile.setAttribute('id', 'sendfile');
            const extensionArray = ['txt', 'xlsx', 'pdf', 'docx', 'doc', 'jpg', 'jpeg', 'ods', 'zip', 'rar', 'tar', 'png', 'odt'];
            const erroMsg = 'Só é possível fazer upload de arquivos: pdf, ods, xlsx, docx, doc, jpg, jpeg, png, ods e arquivos compactados em até 60MB';
            let text
            if(inputFile.files.length > 1 && inputFile.files.length < 16){
                text = `${inputFile.files.length} arquivos selecionados`;
                spanName.textContent = text;                
                let matches = 0;
                for(let element of inputFile.files){
                    const extension = (element.name).split('.')[(element.name).split('.').length -1];
                    if(extensionArray.some( x => x === extension.toLowerCase())){
                        matches++;
                    }
                }
                if(matches === inputFile.files.length){
                    setAttributes(sendFile, {type: 'submit', class: 'button', value: 'Enviar', style: 'margin-top: -5px;'});
                    uploadDiv.appendChild(sendFile); 
                }
                else{
                    if(uploadDiv.querySelector('#sendfile') != null){                
                        uploadDiv.removeChild(sendFile);
                    } 
                    message.innerHTML = erroMsg
                }      

            }else if(inputFile.files.length === 1){
                text = inputFile.value.split("\\");
                let extension = text[2].split('.')[text[2].split('.').length -1];                
                spanName.textContent = text[2];
                if(extensionArray.some( x => x === extension.toLowerCase())){
                    setAttributes(sendFile, {type: 'submit', class: 'button', value: 'Enviar', style: 'margin-top: -5px;'});
                    uploadDiv.appendChild(sendFile);                              
                }else{
                    if(uploadDiv.querySelector('#sendfile') != null){                
                        uploadDiv.removeChild(sendFile);
                    } 
                    message.innerHTML = erroMsg 
                }               
            }else{
                text = `${inputFile.files.length} arquivos selecionados`;
                spanName.textContent = text;
                if(uploadDiv.querySelector('#sendfile') != null){                
                    uploadDiv.removeChild(sendFile);
                } 
                message.innerHTML = 'Só é possível fazer upload de 15 arquivos por vez'
            }            
        });
    }else{
        fileLabel.setAttribute('class', 'button_disable');
        fileLabel.setAttribute('disabled', '');
        inputFile.setAttribute('type', '');
    }      
}

function generateDescription(process){    
    const descriptionsButtonDiv = document.getElementById('descriptionsbuttondiv');
    const smallButton = createElements('small', {}, 'Descrição');
    const descriptionButton = createElements('button', {class: 'button', id: 'descriptionbutton'}, '<img src="/img/down.png" style="width: 9px;"/>');
    const description = createElements('p', {}, process.description);
    const descriptions = document.getElementById('descriptions');
    descriptions.setAttribute('class', 'display_none')
    descriptions.appendChild(description);
    appendElements(descriptionsButtonDiv, [smallButton, descriptionButton]);    
}

function listStates(process, processStates, user){
    const buttonDiv =  document.getElementById('statusbuttondiv');
    const states = document.getElementById('states');
    const smallButton = createElements('small', {}, 'Status');
    const statusButton = createElements('button', {class: 'button', id: 'statusbutton'}, '<img src="/img/down.png" style="width: 9px;"/>');
    const newStatusForm = createElements('form', {id: 'newstatusform',style: 'margin-top: 34px;'});
    const newStatus = createElements('input', {type: 'submit', class: 'button', value: 'Novo Status', id: 'newstatusbutton'});
    const elementID = createElements('input', {type: 'hidden', name: 'elementid', value: process._id});
    
    appendElements(buttonDiv, [smallButton, statusButton]);
    
    if( process.done === false){        
        appendElements(newStatusForm, [newStatus, elementID]);
    }
    generateStatesBlocks(process, processStates, states, user);
    states.setAttribute('class', 'display_none');
    states.appendChild(newStatusForm)
}

function generateStatesBlocks(process, processStates, states, user){
    for(let i of processStates){
        const label1 = createElements('label', {}, 'Status:');
        const label2 = createElements('label', {}, 'Obs:');
        const stateId = createElements('input', {type: 'hidden', name: 'elementid', value: i._id});
        const deleteState = createElements('input', {type: 'submit', class: 'delete_status', value: 'Apagar'});
        const prgh1 = createElements('p', {style: 'font-size: 0.8vw'}, i.state);
        const prgh2 = createElements('p', {style: 'font-size: 0.7vw; font-style: italic;'}, 'Sem observações');

        if(i.anotation){
            setAttributes(prgh2, {style: 'font-size: 0.8vw;'})
            prgh2.innerHTML = i.anotation            
        }

        const date = createElements('small', {},'');
        if(i.user){
            date.innerHTML = `<b>De:</b> ${i.user.pg} ${i.user.name} - ${i.date}`
        }else{
            date.innerHTML = `<b>De:</b> Sistema - ${i.date}`
        }
        const div1 = createContainer('div', {class: 'flexorientation--start'}, [label1, prgh1]);
        const div2 = createContainer('div', {class: 'flexorientation--start'}, [label2, prgh2]);
        const div3 = createContainer('div', {}, [date]);
        let block;
        
        if(i.state == 'Processo Cadastrado'){
            block = createContainer('form', {class: 'status_content display-column-spaceb create_state', name: 'statusblock', 
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Coleta de Orçamentos'){
            block = createContainer('form', {class: 'status_content display-column-spaceb getbudgets_state', name: 'statusblock', 
           }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Em Montagem'){
            block = createContainer('form', {class: 'status_content display-column-spaceb inprocess_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Montagem Finalizada'){
            block = createContainer('form', {class: 'status_content display-column-spaceb makedone_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Em Transferência'){
            block = createContainer('form', {class: 'status_content display-column-spaceb intransfer_state', name: 'statusblock',
        }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Em Análise'){
            block = createContainer('form', {class: 'status_content display-column-spaceb analysis_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Outro'){
            block = createContainer('form', {class: 'status_content display-column-spaceb other_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Retificando Processo'){
            block = createContainer('form', {class: 'status_content display-column-spaceb rectifying_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Processo Concluído'){
            block = createContainer('form', {class: 'status_content display-column-spaceb processdone_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }else{
            block = createContainer('form', {class: 'status_content display-column-spaceb processdone_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);        
        }
        

        if(i.user){
            if(process.done === false && user === i.user._id){
                block.appendChild(deleteState);
            }
        }        
        states.appendChild(block);
        generateStatesClickListener(deleteState, block);
    }
}

function sendProcess(process){
    const sendButton = createElements('button', {id: 'sendbutton',class: 'button'}, '<img style="width: 20px;" src="/img/email.png"/>');
    const forms = document.getElementById('sendprocess');
    const idI =  createElements('input', {type: 'hidden', name: 'id', value: process._id});
    const titleI =  createElements('input', {type: 'hidden', name: 'title', value: process.title});
    const yearI = createElements('input', {type: 'hidden', name: 'year', value: process.year});
    
    appendElements(forms, [sendButton, idI, titleI, yearI]);    

    if(process.done === false){
        setAttributes(sendButton, {class: 'arrow'});
    }else{
        setAttributes(sendButton, { class: 'arrow_disabled', disabled: ''});        
    }

}

function generateOptions(process){
    const section = document.getElementById('idusersection');    
    const processOptions = document.getElementById('processoptions');       
    
    if(section.innerHTML === 'Chefe da SALC' || section.innerHTML === 'SALC'){         
        if(process.done === true){
            const conversor = createElements('input', {type: 'submit', id: 'conversor', class: 'button_disable', value: 'Juntar em um PDF', disabled: ''});
            const returnProcess = createElements('input', {type: 'submit', id: 'returnprocess', class: 'redbutton', value: 'Retificar Processo'})
            const processId = createElements('input', {type: 'hidden', name: 'process', value: process._id});
            const form = createContainer('form', {id: 'endprocess', class: 'bar_color flexorientation--end'}, [conversor, returnProcess, processId]);
            processOptions.appendChild(form);
            return 
        }else{
            const conversor = createElements('input', {type: 'submit', id: 'conversor', class: 'button', value: 'Juntar em um PDF'});
            const doneProcess = createElements('input', {type: 'submit', id: 'doneprocess', class: 'button', value: 'Concluir Processo'});
            const processId = createElements('input', {type: 'hidden', name: 'process', value: process._id});
            const form = createContainer('form', {id: 'endprocess', class: 'bar_color flexorientation--end'}, [conversor, doneProcess, processId]);
            processOptions.appendChild(form);
            return
        }
    }    
}