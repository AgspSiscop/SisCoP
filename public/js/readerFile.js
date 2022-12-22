function listReader(list, itens ,openDir, editDir, trueWhenFile){
    for(let i of itens){
        let element = document.createElement('a');        
        let editButton = document.createElement('input');
        let deleteButton = document.createElement('input')
        let form = document.createElement('form');
        let editField =  document.createElement('input');
        let sendEdit =  document.createElement('input');
        let cancelEdit = document.createElement('input');
        let deleteText = document.createElement('p');    
        list.appendChild(form);
        editField.setAttribute('type', 'hidden');
        editField.setAttribute('name', 'ename');
        editField.setAttribute('class', 'mediumtext')
        sendEdit.setAttribute('type', 'hidden');
        sendEdit.setAttribute('value', 'Ok');
        sendEdit.setAttribute('class', 'button');        
        cancelEdit.setAttribute('type', 'hidden');
        cancelEdit.setAttribute('value', 'Cancelar');
        cancelEdit.setAttribute('class', 'redbutton');
        deleteText.setAttribute('class', 'display_none');
        deleteText.textContent = `Tem certeza que deseja apagar: "${i.name}" ?`
        form.setAttribute('class', 'list_iten')
        form.appendChild(editField);
        form.appendChild(deleteText);
        form.appendChild(sendEdit);
        form.appendChild(cancelEdit);
        element.textContent =  i.name;
        element.setAttribute('href', `${openDir}${i.link}`);
        element.setAttribute('class', 'highlighted');
        if(trueWhenFile){
            element.setAttribute('target', '_blank');
        }
        form.appendChild(element);
        editButton.setAttribute('type', 'submit');
        editButton.setAttribute('value', 'Renomear');
        editButton.setAttribute('class', 'button') 
        form.appendChild(editButton)
        deleteButton.setAttribute('type', 'submit');
        deleteButton.setAttribute('value', 'Apagar');
        deleteButton.setAttribute('class', 'redbutton')
        form.appendChild(deleteButton);
        
        editButton.addEventListener('click', (e)=>{
            e.preventDefault()
            //editField.removeAttribute('type');
            editField.setAttribute('type', 'text');
            editField.setAttribute('required', '');         
            //sendEdit.removeAttribute('type');
            sendEdit.setAttribute('type', 'submit');
            //cancelEdit.removeAttribute('type');
            cancelEdit.setAttribute('type', 'submit');
            form.removeChild(element);
            form.removeChild(editButton);
            form.removeChild(deleteButton);

            sendEdit.addEventListener('click', () =>{
                form.setAttribute('method', 'POST');
                form.setAttribute('action', `${editDir}edit/${i.link}`);
            });

            cancelEdit.addEventListener('click', (e) =>{
                e.preventDefault();
                //editField.removeAttribute('type');
                editField.setAttribute('type', 'hidden');            
                //sendEdit.removeAttribute('type');
                sendEdit.setAttribute('type', 'hidden');
                //cancelEdit.removeAttribute('type');
                cancelEdit.setAttribute('type', 'hidden');
                form.appendChild(element);
                form.appendChild(editButton);
                form.appendChild(deleteButton);   
            });            
        });
        
        deleteButton.addEventListener('click', (e) => {            
            e.preventDefault()
            form.setAttribute('class', 'list_iten_delete')
            deleteText.removeAttribute('class');      
            sendEdit.removeAttribute('type');
            sendEdit.setAttribute('type', 'submit');
            cancelEdit.removeAttribute('type');
            cancelEdit.setAttribute('type', 'submit');
            form.removeChild(element);
            form.removeChild(editButton);
            form.removeChild(deleteButton);

            sendEdit.addEventListener('click', () =>{
                form.setAttribute('method', 'POST');
                form.setAttribute('action', `${editDir}delete/${i.link}`);
            });

            cancelEdit.addEventListener('click', (e) =>{
                e.preventDefault();
                form.setAttribute('class', 'list_iten')
                deleteText.setAttribute('class', 'display_none')            
                sendEdit.removeAttribute('type');
                sendEdit.setAttribute('type', 'hidden');
                cancelEdit.removeAttribute('type');
                cancelEdit.setAttribute('type', 'hidden');
                form.appendChild(element);
                form.appendChild(editButton);
                form.appendChild(deleteButton);   
            });
        })
    }
}

function upload(year, title){
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
            formUpload.setAttribute('action', `/meusprocessos/${year}/${title}`);
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

function listStates(list){
    const states = document.getElementById('states');

    for(let i of list){
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');
        const block = document.createElement('div');
        const label1 = document.createElement('label');
        const label2 = document.createElement('label');
        const label3 = document.createElement('label');
        const label4 = document.createElement('label');
        const prgh1 = document.createElement('P');
        const prgh2 = document.createElement('P');
        const date = document.createElement('small');

        div1.setAttribute('class', 'flexorientation--start');
        div2.setAttribute('class', 'flexorientation--start')

        label1.textContent = 'Observação:';
        prgh1.textContent = i.anotation;
        div1.appendChild(label1);
        div1.appendChild(prgh1);
        states.appendChild(div1);

        label2.textContent = 'Status:';
        prgh2.textContent = i.state;
        div2.appendChild(label2);
        div2.appendChild(prgh2);
        states.appendChild(div2);

        date.textContent = i.date;
        div3.appendChild(date);
        
        block.setAttribute('class', 'status_content')
        block.appendChild(div1);
        block.appendChild(div2);
        block.appendChild(div3);
        states.appendChild(block);
    }
        
}





