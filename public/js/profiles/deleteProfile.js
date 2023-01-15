(function readyJS(win, doc){    
    'use strict';
    
    const nameButton = document.getElementById('usernamebutton');
    const username = document.getElementById('username');
    const formMain = document.getElementById('deleteone');
    const divMain = document.createElement('div'); 
    

    nameButton.addEventListener('click', () => {       
        let ajax =  new XMLHttpRequest();
        let params1 = `name=${username.value}`;
        
        while(divMain.childNodes.length > 0){                                                                             
            divMain.removeChild(divMain.firstChild);                       
        }                      
        
        ajax.open('POST', `/getuser`);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function(){           
            if(ajax.status === 200 && ajax.readyState === 4){
                if(JSON.parse(ajax.responseText)){
                    const user = JSON.parse(ajax.responseText);
                    const title = document.createElement('p');
                    const divButton = document.createElement('div');
                    const confirmButton = document.createElement('input');
                    const cancelButton = document.createElement('input');
                    const hr = document.createElement('hr');
                    const section =  document.createElement('small');
                    const pg = document.createElement('small');
                    const level = document.createElement('small');
                    const descriptionDiv = document.createElement('div');
                    title.innerHTML = `Você tem certeza que dejesa apagar o usuário ${user.name}?`
                    pg.innerHTML = `Posto/Graduação: ${user.pg}`;
                    section.innerHTML = `Seção: ${user.section}`;
                    level.innerHTML = `level: ${user.level}`;
                    
                    divButton.className = 'flexorientation--spacea';
                    confirmButton.className = 'button';
                    confirmButton.type = 'submit';
                    confirmButton.value = 'Apagar';
                    cancelButton.className = 'redbutton';
                    cancelButton.type = 'submit';
                    cancelButton.value = 'Cancelar';
                    descriptionDiv.className = 'user_description'
                    divButton.appendChild(confirmButton);
                    divButton.appendChild(cancelButton);
                    descriptionDiv.appendChild(pg);
                    descriptionDiv.appendChild(section);
                    descriptionDiv.appendChild(level);
                    divMain.appendChild(hr)
                    divMain.appendChild(title);
                    divMain.appendChild(descriptionDiv);                    
                    divMain.appendChild(divButton);
                    formMain.appendChild(divMain);
                    
                    confirmButton.addEventListener('click', () => {
                        const name = document.createElement('input');
                        name.name = 'name'
                        name.value = user.name
                        formMain.appendChild(name)
                        formMain.setAttribute('action', '/deleteuser/delete');
                        formMain.setAttribute('method', 'POST');
                    });
    
                    cancelButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        location.reload()
                        
                    });
                }else{
                    const title = document.createElement('p');
                    const hr = document.createElement('hr');

                    title.innerHTML = 'Usuário não encontrado!';
                    divMain.appendChild(hr);
                    divMain.appendChild(title);
                    formMain.appendChild(divMain);
                }
            }   
        };
        ajax.send(params1);
    });

})(window, document)

