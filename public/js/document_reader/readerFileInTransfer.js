function listReader(list, itens ,openDir, editDir){
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
        let deleteText = document.createElement('p');
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let div3 =  document.createElement('div');
        let buttonsDiv = document.createElement('div');
        list.appendChild(form);

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
                form.setAttribute('action', `${editDir}edit/${i.link}`);
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
                form.setAttribute('action', `${editDir}delete/${i.link}`);
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
            form.setAttribute('action', `${openDir}${i.link}`);
        });
    }
}

function upload(year, title, local){
    const inputFile = document.getElementById('file');
    const spanName = document.getElementById('filename');
    const formUpload = document.getElementById('upload');
    const message = document.getElementById('message');
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
            formUpload.setAttribute('action', `/processosrecebidos/${year}/${title}/upload/${local}`);
            formUpload.setAttribute('method', 'POST');
            formUpload.setAttribute('enctype', 'multipart/form-data'); //*
        }else{
            if(formUpload.querySelector('#sendfile') != null){                
                formUpload.removeChild(sendFile);
            }
                   
            message.innerHTML = 'Só é possível fazer upload de arquivos: pdf, ods, xlsx, docx, doc, jpg, jpeg, png, ods e arquivos compactados em até 60MB';                       ;
        }        
    });
}

function listStates(list, year, link, title){
    const states = document.getElementById('states');
    const statusButton = document.getElementById('statusbutton');
    const div4 = document.createElement('div');
    const newStatus =  document.createElement('a');

    newStatus.setAttribute('class', 'button');
    newStatus.setAttribute('href', `/processosrecebidos/${year}/${link}/anotation/${title}`)
    newStatus.textContent = 'Novo Status';
    div4.appendChild(newStatus);
    div4.setAttribute('style', 'margin-top: 34px;');

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
        
        block.setAttribute('class', 'status_content display-column-spaceb display_none');
        block.setAttribute('name', 'statusblock');
        block.appendChild(div1);
        block.appendChild(div2);
        block.appendChild(div3);
        block.appendChild(stateId);
        if(i.state != 'Em transferência'){
            block.appendChild(deleteState);
        }
        states.appendChild(block);
        states.appendChild(div4);

        deleteState.addEventListener('click', () => {
            block.setAttribute('method', 'POST');
            block.setAttribute('action', `/processosrecebidos/${year}/${link}/anotation/${title}/delete`)        
        });
    }    

    statusButton.addEventListener('click', (e) =>{
        e.preventDefault();
        const block = document.getElementsByName('statusblock');
        for(let i of block){
            if(i.getAttribute('class') == 'status_content display-column-spaceb display_none'){
                i.setAttribute('class', 'status_content display-column-spaceb');
                statusButton.textContent = '-';
                //states.appendChild(div4);
            }else{
                i.setAttribute('class', 'status_content display-column-spaceb display_none');
                statusButton.textContent = '+';
                //states.removeChild(div4)
            }
        }
    });

    ;
        
}





