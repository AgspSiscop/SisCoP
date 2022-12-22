function listReader(list, itens ,address){
    for(let i of itens){
        let element = document.createElement('a');        
        let editButton = document.createElement('input');
        let deleteButton = document.createElement('input')
        let form = document.createElement('form');
        let editField =  document.createElement('input');
        let sendEdit =  document.createElement('input');
        let cancelEdit = document.createElement('input');
        let deleteText = document.createElement('p');
        let anotation = document.createElement('a');        
        let id = document.createElement('input');
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');
        let div3 = document.createElement('div');
        let buttonsDiv = document.createElement('div');
        let date = document.createElement('small');    


        list.appendChild(form);
        
        id.setAttribute('type', 'hidden');
        id.setAttribute('value', `${i.id}`);
        id.setAttribute('name', 'elementid');
        

        editField.setAttribute('type', 'hidden');
        editField.setAttribute('name', 'ename');
        editField.setAttribute('class', 'mediumtext');

        sendEdit.setAttribute('type', 'hidden');
        sendEdit.setAttribute('value', 'Ok');
        sendEdit.setAttribute('class', 'button');

        cancelEdit.setAttribute('type', 'hidden');
        cancelEdit.setAttribute('value', 'Cancelar');
        cancelEdit.setAttribute('class', 'redbutton');

        deleteText.setAttribute('class', 'display_none');
        deleteText.textContent = `Tem certeza que deseja apagar: "${i.title}" ?`

        form.setAttribute('class', 'list_iten');
        form.appendChild(div1);
        form.appendChild(div2);        
        form.appendChild(div3)
        div1.appendChild(editField)
        div1.appendChild(deleteText)
        div1.appendChild(sendEdit)
        div1.appendChild(cancelEdit)
       
        form.appendChild(id)
        element.textContent =  i.title;
        element.setAttribute('href', `${address}${i.dir}`);
        element.setAttribute('class', 'highlighted')
        
   
        editButton.setAttribute('type', 'submit');
        editButton.setAttribute('value', 'Renomear');
        editButton.setAttribute('class', 'button') 

        anotation.setAttribute('href', `${address}${i.dir}/anotation/${i.title}`);        
        anotation.setAttribute('class', 'button');
        anotation.textContent = 'Anotação'        
       
        deleteButton.setAttribute('type', 'submit');
        deleteButton.setAttribute('value', 'Apagar');
        deleteButton.setAttribute('class', 'redbutton');
        
        div2.setAttribute('class', 'display-floar-left')
        div2.appendChild(element);
        div2.appendChild(buttonsDiv)
        buttonsDiv.setAttribute('class', 'display-float-right')
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(anotation);        
        buttonsDiv.appendChild(deleteButton);

        date.textContent = i.date        
        div3.appendChild(date);

        
        editButton.addEventListener('click', (e)=>{
            e.preventDefault()
            
            editField.setAttribute('type', 'text');
            editField.setAttribute('required', '');         
            
            sendEdit.setAttribute('type', 'submit');
            
            cancelEdit.setAttribute('type', 'submit');
            form.removeChild(div2)
            

            sendEdit.addEventListener('click', () =>{
                form.setAttribute('method', 'POST');
                form.setAttribute('action', `${address}edit/${i.id}`);
            });

            cancelEdit.addEventListener('click', (e) =>{
                e.preventDefault();
                
                editField.setAttribute('type', 'hidden');            
               
                sendEdit.setAttribute('type', 'hidden');
                
                cancelEdit.setAttribute('type', 'hidden');

                form.removeChild(div3);
                form.appendChild(div2);
                form.appendChild(div3);
                  
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
            form.removeChild(div2);
           

            sendEdit.addEventListener('click', () =>{
                form.setAttribute('method', 'POST');
                form.setAttribute('action', `${address}delete/${i.dir}`);
            });

            cancelEdit.addEventListener('click', (e) =>{
                e.preventDefault();
                form.setAttribute('class', 'list_iten')
                deleteText.setAttribute('class', 'display_none')            
                sendEdit.removeAttribute('type');
                sendEdit.setAttribute('type', 'hidden');
                cancelEdit.removeAttribute('type');
                cancelEdit.setAttribute('type', 'hidden');
                form.removeChild(div3);
                form.appendChild(div2);
                form.appendChild(div3);
                  
            });
        })
    }
}







