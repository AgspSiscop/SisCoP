(function readyJS(){
    'use strict';

    
    const receiver = document.getElementById('receiver');
    const sections = document.getElementById('messagesection')
    const formm = document.getElementById('formm');    
    const year = document.getElementById('year');
    const process = document.getElementById('process');
    const send = document.getElementById('submitformm');   


    sections.addEventListener('change', () => {
        while(receiver.childNodes.length > 0){                           
            receiver.removeChild(receiver.firstChild);            
        }  
        if(sections.value == ''){
            const users = document.createElement('select');
            const labelUsers = document.createElement('label');
            let ajax =  new XMLHttpRequest();
            //let params = 'section=' + sections.value;

            labelUsers.innerHTML = 'Usuário:';
            users.setAttribute('name', 'user');
            users.setAttribute('id', 'user');           
            receiver.appendChild(labelUsers);
            receiver.appendChild(users);

            ajax.open('POST', '/mensageiro/users');
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajax.onreadystatechange = function(){
                if(ajax.status === 200 && ajax.readyState === 4){
                    for(let i of JSON.parse(ajax.responseText)){
                        const name = document.createElement('option');                        
                        name.setAttribute('value', i._id);
                        name.innerHTML = `${i.pg} ${i.name}`;
                        users.appendChild(name);
                    }                               
                }    
            };
            ajax.send();
        }
    })

   send.addEventListener('click', () => {   
    let selected =  document.getElementById(process.value) || null;
    let title;
    
    if(selected ==  null){
        title = 'Menssagem sem Processo';
        formm.setAttribute('action', `/mensageiro/novasemprocesso/${title}`);         
    }else{
        title = selected.innerHTML
        formm.setAttribute('action', `/mensageiro/nova/${title}`);
    }
    if(receiver.hasChildNodes()){
        const username = document.createElement('input');
        const select = document.getElementById('user');
        const text = select.children[select.selectedIndex];
        username.setAttribute('name', 'username');
        username.setAttribute('value', text.textContent);
        formm.appendChild(username);
    }   
   });

    year.addEventListener('change', (e) => {
        let ajax =  new XMLHttpRequest();
        let params = 'year=' + year.value;
        while(process.childNodes.length > 0){                           
            process.removeChild(process.firstChild);            
        }              
        
        ajax.open('POST', '/mensageiro/processes');
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function(){
            if(ajax.status === 200 && ajax.readyState === 4){                                        
               for(let i of JSON.parse(ajax.responseText)){                
                let option = document.createElement('option');                             
                option.setAttribute('value', `${i._id}`);
                option.setAttribute('id', `${i._id}`)
                option.textContent = i.title
                process.appendChild(option);               
               }               
            }    
        };
        ajax.send(params);
    });   

})(window, document)

