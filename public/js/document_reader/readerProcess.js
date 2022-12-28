(function readyJS(win, doc){
    'use strict';
    
    
    let formp =  doc.getElementById('formp');    
    let  year = doc.getElementById('year');
    let list = doc.getElementById('list')

   

    year.addEventListener('change', () => {
        let ajax =  new XMLHttpRequest();
        let params = 'year=' + year.value;
        for(let child of list.childNodes){                          
            child.remove();        
        }
        for(let child of list.childNodes){                          
            child.remove();            
        }
        
        
        ajax.open('POST', `/meusprocessos/${year.value}`);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function(){
            if(ajax.status === 200 && ajax.readyState === 4){                          
               for(let i of JSON.parse(ajax.responseText)){     
                
                let element = document.createElement('input');        
                let editButton = document.createElement('input');
                let deleteButton = document.createElement('input')
                let form = document.createElement('form');
                let editField =  document.createElement('input');
                let editFieldMessage =  document.createElement('p');
                let sendEdit =  document.createElement('input');
                let cancelEdit = document.createElement('input');
                let sendDelete = document.createElement('input');
                let cancelDelete = document.createElement('input');
                let deleteText = document.createElement('p');
                let anotation = document.createElement('a');        
                let id = document.createElement('input');
                let div1 = document.createElement('div');
                let div2 = document.createElement('div');
                let textItens = document.createElement('div');
                let div3 =  document.createElement('div');
                let buttonsDiv = document.createElement('div');
                let date = document.createElement('small');

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
                
                //-------------------------------------------------FORM/DIV2
                //-----------------------------FORM/DIV2/TEXTITENS
                element.setAttribute('type', 'submit');
                element.setAttribute('class', 'transparentbutton highlighted');
                element.setAttribute('value', `${i.title}`);
                /*element.textContent =  i.title;
                element.setAttribute('href', `/processosrecebidos/${year.value}/${i.dir}`);
                element.setAttribute('class', 'highlighted');*/      

                date.textContent = i.date;
                date.setAttribute('style', 'display: block; margin-top: 5px;');
                
                //----------------------------------------FORM/DIV2/BUTTONSDIV
               editButton.setAttribute('type', 'submit');
                editButton.setAttribute('value', 'Renomear');
                editButton.setAttribute('class', 'button');

                anotation.setAttribute('href', `/meusprocessos/${year.value}/${i.dir}/anotation/${i.title}`);        
                anotation.setAttribute('class', 'button');
                anotation.textContent = 'Anotação'        
            
                deleteButton.setAttribute('type', 'submit');
                deleteButton.setAttribute('value', 'Apagar');
                deleteButton.setAttribute('class', 'redbutton');

                //-----------------------------------------------------------------------------FORM/DIV3
                deleteText.textContent = `Tem certeza que deseja apagar: "${i.title}" ?`;

                sendDelete.setAttribute('type', 'submit');
                sendDelete.setAttribute('value', 'Ok');
                sendDelete.setAttribute('class', 'button');

                cancelDelete.setAttribute('type', 'submit');
                cancelDelete.setAttribute('value', 'Cancelar');
                cancelDelete.setAttribute('class', 'redbutton');
                
                //---------------------------------------------------FORM
                id.setAttribute('type', 'hidden');
                id.setAttribute('value', `${i._id}`);
                id.setAttribute('name', 'elementid');
                //--------------------------------------------------------------------//     
                
                div1.appendChild(editFieldMessage)
                div1.appendChild(editField)        
                div1.appendChild(sendEdit)
                div1.appendChild(cancelEdit)
                div1.setAttribute('class', 'display_none');     
                
                textItens.appendChild(element);            
                textItens.appendChild(date)
                buttonsDiv.appendChild(editButton);
                buttonsDiv.appendChild(anotation);        
                buttonsDiv.appendChild(deleteButton);

                div2.setAttribute('class', 'flexorientation--spaceb');
                div2.appendChild(textItens);
                div2.appendChild(buttonsDiv);        

                div3.appendChild(deleteText);
                div3.appendChild(sendDelete);
                div3.appendChild(cancelDelete);
                div3.setAttribute('class', 'display_none');

                form.setAttribute('class', 'list_iten');
                form.appendChild(div1);
                form.appendChild(div2);        
                form.appendChild(div3)
                form.appendChild(id);      

                
                editButton.addEventListener('click', (e)=>{
                    e.preventDefault();            
                    editField.setAttribute('value', `${i.title}`)        
                    div1.setAttribute('class', '');            
                    div2.setAttribute('class', 'display_none');            

                    sendEdit.addEventListener('click', (e) =>{
                        if(editField.value.includes('_') || editField.value.includes('.') || editField.value == ''){
                            e.preventDefault();
                            editFieldMessage.textContent = 'Este campo deve ser preenchido e não aceita os caracteres: "_" , "."'
                        }else{
                            form.setAttribute('method', 'POST');
                            form.setAttribute('action', `/meusprocessos/${year.value}/edit/${i.dir}`);
                        }                
                    });

                    cancelEdit.addEventListener('click', (e) =>{
                        e.preventDefault();
                        editFieldMessage.textContent = '';
                        div1.setAttribute('class', 'display_none');                
                        div2.setAttribute('class', 'flexorientation--spaceb');                 
                    });            
                });     
                
                deleteButton.addEventListener('click', (e) => {            
                    e.preventDefault()
                    form.setAttribute('class', 'list_iten_delete');            
                    div3.setAttribute('class', '');
                    div2.setAttribute('class', 'display_none');           

                    sendDelete.addEventListener('click', () =>{
                        form.setAttribute('method', 'POST');
                        form.setAttribute('action', `/meusprocessos/${year.value}/delete/${i.dir}`);
                    });

                    cancelDelete.addEventListener('click', (e) =>{
                        e.preventDefault();
                        form.setAttribute('class', 'list_iten');                
                        div3.setAttribute('class', 'display_none');
                        div2.setAttribute('class', 'flexorientation--spaceb');
                    });
                });

                element.addEventListener('click', () => {
                    form.setAttribute('method', 'POST');
                    form.setAttribute('action', `/meusprocessos/${year.value}/${i.dir}`);
                })
                console.log(i)
               }               
            }    
        };
        ajax.send(params);
    });

})(window, document)