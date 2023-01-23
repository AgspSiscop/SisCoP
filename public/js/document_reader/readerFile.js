function listReader(list, itens ,url, transfer, done){
    
    for(let i of itens){
        let element = document.createElement('input');        
        let editButton = document.createElement('input');
        let deleteButton = document.createElement('input')
        let form = document.createElement('form');
        let editField =  document.createElement('input');
        let editFieldMessage =  document.createElement('p');
        let sendEdit =  document.createElement('input');
        let cancelEdit = document.createElement('input');
        let sendDelete =  document.createElement('input');
        let cancelDelete = document.createElement('input');
        let elementid = document.createElement('input');
        let deleteText = document.createElement('p');
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let div3 =  document.createElement('div');
        let buttonsDiv = document.createElement('div');
        list.appendChild(form);
        
        
        if(transfer === null  && done === null){
            //---------------------------------------------FORM/DIV1
            editField.setAttribute('type', 'text');
            editField.setAttribute('name', 'ename');
            editField.setAttribute('class', 'mediumtext');

            sendEdit.setAttribute('type', 'submit');
            sendEdit.setAttribute('value', 'Ok');
            sendEdit.setAttribute('class', 'button');  

            cancelEdit.setAttribute('type', 'submit');
            cancelEdit.setAttribute('value', 'Cancelar');
            cancelEdit.setAttribute('class', 'redbutton');
            
            //----------------------------------------------FORM/DIV2
            //--------------------------------FORM/DIV2/ELEMENT
            element.setAttribute('type', 'submit');
            element.setAttribute('class', 'transparentbutton highlighted');
            element.setAttribute('value', `${i.name}`);        

            //-----------------------------------------FORM/DIV2/BUTTONSDIV
            editButton.setAttribute('type', 'submit');
            editButton.setAttribute('value', 'Renomear');
            editButton.setAttribute('class', 'button') 
            
            deleteButton.setAttribute('type', 'submit');
            deleteButton.setAttribute('value', 'Apagar');
            deleteButton.setAttribute('class', 'redbutton');
            
            //-------------------------------------------------------------------------FORM/DIV3
            deleteText.textContent = `Tem certeza que deseja apagar: "${i.name}" ?`
            
            sendDelete.setAttribute('type', 'submit');
            sendDelete.setAttribute('value', 'Ok');
            sendDelete.setAttribute('class', 'button');
            
            cancelDelete.setAttribute('value', 'Cancelar');
            cancelDelete.setAttribute('class', 'redbutton');
            cancelDelete.setAttribute('type', 'submit');
            //---------------------------------------------------------------//              
            

            div1.setAttribute('class', 'display_none');
            div1.appendChild(editFieldMessage);
            div1.appendChild(editField);        
            div1.appendChild(sendEdit);
            div1.appendChild(cancelEdit);        

            buttonsDiv.appendChild(editButton);
            buttonsDiv.appendChild(deleteButton);

            div2.setAttribute('class', 'flexorientation--spaceb');
            div2.appendChild(element);
            div2.appendChild(buttonsDiv);
            
            div3.setAttribute('class', 'display_none');
            div3.appendChild(deleteText);
            div3.appendChild(sendDelete);
            div3.appendChild(cancelDelete);
            
            form.setAttribute('class', 'list_iten');
            form.appendChild(div1);
            form.appendChild(div2);
            form.appendChild(div3)      
            
            
            editButton.addEventListener('click', (e)=>{
                e.preventDefault()
                editField.setAttribute('value', `${(i.name).split('.')[0]}`) 
                div1.setAttribute('class', '');
                div2.setAttribute('class', 'display_none');

                sendEdit.addEventListener('click', (e) =>{                
                    if(editField.value.includes('_') || editField.value.includes('.') || editField.value == ''){
                        e.preventDefault();
                        editFieldMessage.textContent = 'Este campo deve ser preenchido e não aceita os caracteres: "_" , "."'
                    }else{
                    form.setAttribute('method', 'POST');
                    form.setAttribute('action', `${url}edit/${i.name}`);
                    form.setAttribute('target', '');
                    }
                });

                cancelEdit.addEventListener('click', (e) =>{
                    e.preventDefault();
                    editFieldMessage.textContent = ''               
                    div1.setAttribute('class', 'display_none');
                    div2.setAttribute('class', 'flexorientation--spaceb')
                });            
            });
            
            deleteButton.addEventListener('click', (e) => {            
                e.preventDefault();            
                form.setAttribute('class', 'list_iten_delete')
                div3.setAttribute('class', '');
                div2.setAttribute('class', 'display_none');
                

                sendDelete.addEventListener('click', () =>{
                    form.setAttribute('method', 'POST');
                    form.setAttribute('action', `${url}delete/${i.name}`);
                    form.setAttribute('target', '');
                });

                cancelDelete.addEventListener('click', (e) =>{
                    e.preventDefault();               
                    form.setAttribute('class', 'list_iten')
                    div3.setAttribute('class', 'display_none');
                    div2.setAttribute('class', 'flexorientation--spaceb');                
                    
                });
            });

            element.addEventListener('click', () => {
                form.setAttribute('target', '_blank');
                form.setAttribute('method', 'POST');
                form.setAttribute('action', `${url}${i.name}`);
            });
        }else{
            element.setAttribute('type', 'submit');
            element.setAttribute('class', 'transparentbutton highlighted');
            element.setAttribute('value', `${i.name}`);        

            //-----------------------------------------FORM/DIV2/BUTTONSDIV
            editButton.setAttribute('type', 'submit');
            editButton.setAttribute('value', 'Renomear');
            editButton.setAttribute('class', 'button_disable');
            editButton.setAttribute('disabled', '') 
            
            deleteButton.setAttribute('type', 'submit');
            deleteButton.setAttribute('value', 'Apagar');
            deleteButton.setAttribute('class', 'redbutton');
            deleteButton.setAttribute('class', 'button_disable');
            deleteButton.setAttribute('disabled', '')

            buttonsDiv.appendChild(editButton);
            buttonsDiv.appendChild(deleteButton);

            div2.setAttribute('class', 'flexorientation--spaceb');
            div2.appendChild(element);
            div2.appendChild(buttonsDiv);
            form.appendChild(div2);

            element.addEventListener('click', () => {
                form.setAttribute('target', '_blank');
                form.setAttribute('method', 'POST');
                form.setAttribute('action', `${url}${i.name}`);
            });
        }
    }
}

function upload(local, url, transfer, done){
    const inputFile = document.getElementById('file');
    const buttonFile = document.getElementById('button_file')
    const spanName = document.getElementById('filename');
    const formUpload = document.getElementById('upload');
    const message = document.getElementById('message');

    if(transfer === null  && done === null){
        const sendFile = document.createElement('input');
            
        inputFile.value = '' //resets when page is reloaded
        
        inputFile.addEventListener('change', () => {        
            sendFile.setAttribute('id', 'sendfile');
            message.innerHTML = ''
                                
            let text = inputFile.value.split("\\");
            let extension = text[2].split('.')[text[2].split('.').length -1];
            spanName.textContent = text[2];
            if(extension.toLowerCase() == 'txt' || extension.toLowerCase() == 'xlsx' || extension.toLowerCase() == 'pdf' || extension.toLowerCase() == 'docx' || 
            extension.toLowerCase() == 'doc' || extension.toLowerCase() == 'jpg' || extension.toLowerCase() == 'jpeg' || extension.toLowerCase() == 'ods' || 
            extension.toLowerCase() == 'zip' || extension.toLowerCase() == 'rar' || extension.toLowerCase() == 'jar' || extension.toLowerCase() == 'zip' || extension.toLowerCase() == 'png'){
                sendFile.setAttribute('type', 'submit');
                sendFile.setAttribute('class', 'button');
                sendFile.setAttribute('value', 'enviar');
                formUpload.appendChild(sendFile);            
                formUpload.setAttribute('action', `${url}upload/${local}`);
                formUpload.setAttribute('method', 'POST');
                formUpload.setAttribute('enctype', 'multipart/form-data'); //*
            }else{
                if(formUpload.querySelector('#sendfile') != null){                
                    formUpload.removeChild(sendFile);
                }
                    
                message.innerHTML = 'Só é possível fazer upload de arquivos: pdf, ods, xlsx, docx, doc, jpg, jpeg, png, ods e arquivos compactados em até 60MB';                       ;
            }        
        });
    }else{
        buttonFile.setAttribute('class', 'button_disable');
        buttonFile.setAttribute('disable', '');
        inputFile.setAttribute('type', '')
    }
}

function listStates(list, title, url, elementid, transfer, done){
    const states = document.getElementById('states');
    const statusButton = document.getElementById('statusbutton');
    const newStatusForm = document.createElement('form');

    states.setAttribute('class', 'display_none');
    
    if(transfer === null  && done === null){
        const newStatus =  document.createElement('input');
        const elementID = document.createElement('input');
        newStatus.setAttribute('class', 'button');
        newStatus.setAttribute('type', 'submit');        
        newStatus.value = 'Novo Status';
        elementID.setAttribute('type', 'hidden');
        elementID.value = elementid;
        elementID.setAttribute('name', 'elementid');
        newStatusForm.appendChild(newStatus);
        newStatusForm.appendChild(elementID);
        newStatusForm.setAttribute('style', 'margin-top: 34px;');
        
        newStatus.addEventListener('click', () => {
            newStatusForm.setAttribute('method', 'POST');
            newStatusForm.setAttribute('action', `${url}anotation/${title}`);
        })
    }

    for(let i of list){
        const block = document.createElement('form');
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const label1 = document.createElement('label');
        const label2 = document.createElement('label');
        const stateId = document.createElement('input');
        const deleteState = document.createElement('input');
        const prgh1 = document.createElement('P');
        const prgh2 = document.createElement('P');
        const date = document.createElement('small');

        div1.setAttribute('class', 'flexorientation--start');
        div2.setAttribute('class', 'flexorientation--start')

        label1.textContent = 'Observação:';
        prgh1.textContent = i.anotation;
        if(i.anotation){
            div1.appendChild(label1);
        }
        div1.appendChild(prgh1);        

        label2.textContent = 'Status:';
        prgh2.textContent = i.state;
        div2.appendChild(label2);
        div2.appendChild(prgh2);
        

        date.textContent = i.date;
        div3.appendChild(date);

        stateId.setAttribute('type', 'hidden');
        stateId.setAttribute('name', 'elementid')
        stateId.setAttribute('value', `${i.id}`);

        deleteState.setAttribute('type', 'submit');
        deleteState.setAttribute('class', 'transparentbutton');
        deleteState.setAttribute('value', 'Apagar');
        
        block.setAttribute('class', 'status_content display-column-spaceb');
        block.setAttribute('name', 'statusblock');
        block.appendChild(div1);
        block.appendChild(div2);
        block.appendChild(div3);
        block.appendChild(stateId);
        if(transfer == null  && done == null && i.state != 'Em transferência'){
            block.appendChild(deleteState);
        }

        states.appendChild(block);
               

        deleteState.addEventListener('click', () => {
            block.setAttribute('method', 'POST');
            block.setAttribute('action', `${url}anotation/${title}/delete`)        
        });
    }
    states.appendChild(newStatusForm);

    statusButton.addEventListener('click', (e) =>{
        e.preventDefault();                 
        
        
            if(states.getAttribute('class') == 'display_none'){
                states.setAttribute('class', '');
                statusButton.textContent = '-';                               
            }else{
                states.setAttribute('class', 'display_none');
                statusButton.textContent = '+';                               
            }
        
    });       
}

function sendProcess(id, title, year){
    const forms = document.getElementById('sendprocess');
    const sendButton = document.createElement('input');
    if(transfer === null  && done === null){

        sendButton.setAttribute('class', 'arrow');
        sendButton.setAttribute('value', 'Enviar');
        sendButton.setAttribute('type', 'submit');
        forms.appendChild(sendButton);

        sendButton.addEventListener('click', ()=>{
            const idI = document.createElement('input');
            const titleI = document.createElement('input');
            const yearI =  document.createElement('input');

            idI.setAttribute('type', 'hidden');
            idI.setAttribute('name', 'id');
            idI.setAttribute('value', `${id}`);
            titleI.setAttribute('type', 'hidden');
            titleI.setAttribute('name', 'title');
            titleI.setAttribute('value', `${title}`);
            yearI.setAttribute('type', 'hidden');
            yearI.setAttribute('name', 'year');
            yearI.setAttribute('value', `${year}`);

            
            forms.appendChild(idI);
            forms.appendChild(titleI);
            forms.appendChild(yearI)
            forms.setAttribute('method', 'POST');
            forms.setAttribute('action', `/mensageiro/nova/`)
        })
    }else{
        sendButton.setAttribute('class', 'arrow_disabled');
        sendButton.setAttribute('disabled', '');
        sendButton.setAttribute('type', 'submit');
        sendButton.setAttribute('value', 'Enviar');
        forms.appendChild(sendButton)
    }
}





