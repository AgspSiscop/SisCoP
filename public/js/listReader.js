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
        deleteText.textContent = 'Tem certeza que deseja apagar este item?'
        form.appendChild(editField);
        form.appendChild(deleteText);
        form.appendChild(sendEdit);
        form.appendChild(cancelEdit);
        element.textContent =  i.name;
        element.setAttribute('href', `${openDir}${i.link}`);
        if(trueWhenFile){
            element.setAttribute('target', '_blank');
        }
        form.appendChild(element);
        editButton.setAttribute('type', 'submit');
        editButton.setAttribute('value', 'Editar');
        editButton.setAttribute('class', 'button') 
        form.appendChild(editButton)
        deleteButton.setAttribute('type', 'submit');
        deleteButton.setAttribute('value', 'Apagar');
        deleteButton.setAttribute('class', 'redbutton')
        form.appendChild(deleteButton);
        
        editButton.addEventListener('click', (e)=>{
            e.preventDefault()
            editField.removeAttribute('type');
            editField.setAttribute('type', 'text');
            editField.setAttribute('required', '');         
            sendEdit.removeAttribute('type');
            sendEdit.setAttribute('type', 'submit');
            cancelEdit.removeAttribute('type');
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
                editField.removeAttribute('type');
                editField.setAttribute('type', 'hidden');            
                sendEdit.removeAttribute('type');
                sendEdit.setAttribute('type', 'hidden');
                cancelEdit.removeAttribute('type');
                cancelEdit.setAttribute('type', 'hidden');
                form.appendChild(element);
                form.appendChild(editButton);
                form.appendChild(deleteButton);   
            });            
        });
        
        deleteButton.addEventListener('click', (e) => {            
            e.preventDefault()
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





