(function readyJS(win, doc){    
    'use strict';
    
    const nameButton = document.getElementById('usernamebutton');
    const username = document.getElementById('username');
    const formu = document.getElementById('formu');
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
                    const hr = document.createElement('hr');
                    const name = document.createElement('input');
                    const password = document.createElement('input');
                    const pg = document.createElement('select');
                    const section = document.createElement('select');
                    const level = document.createElement('input');
                    const titles = ['Nome:', 'Senha:', 'Posto/Graduação', 'Seção:', 'Level:'];
                    const pgOptions = ['Cel', 'Ten Cel', 'Maj', 'Cap', '1º Ten', '2º Ten', 'Asp', 'Sub Ten', '1º Sgt', '2º Sgt', '3º Sgt', 'Cb', 'Sd'];
                    const sectionsOptions = ['Armamento Pesado','Armamento Leve', 'Correaria', 'STS', 'Linha de Blindados', 
                    'Comunicações', 'Óptica', 'Pelotão de Obras', 'Almoxerifado', 'Suprimento', 'Informática', 'Posto Médico', 
                    'Divisão de Inovação, Planejamento e Qualidade', 'Divisão Industrial', 'Compania de Comando e Serviço', 'SALC', 'DPGOT', 
                    'Chefe da SALC', 'ADM', 'Fiscal ADM', 'Ordenador de Despesas'];
                    const entries = [name, password, pg, section, level];
                    const sendButton = document.createElement('input');
    
                    name.name = 'name';
                    name.type = 'text';
                    name.value = user.name;
                    password.name = 'password';
                    password.type = 'password';
                    pg.name = 'pg'                    
                    section.name = 'section';
                    level.name = 'level';
                    level.type = 'text';
                    level.value = user.level
                    sendButton.type = 'submit'
                    sendButton.className = 'button'
                    sendButton.value = 'Atualizar'
    
                    divMain.appendChild(hr);
                    for(let i = 0; i < pgOptions.length; i++){
                        const options = document.createElement('option');
                        options.value = pgOptions[i];
                        options.innerHTML = pgOptions[i];
                        pg.appendChild(options);
                        if(pgOptions[i] == user.pg){
                            options.selected = true;
                        }
                    }
                    for(let i = 0; i < sectionsOptions.length; i++){
                        const options = document.createElement('option');
                        options.value = sectionsOptions[i];
                        options.innerHTML = sectionsOptions[i];
                        section.appendChild(options);
                        if(sectionsOptions[i] == user.section){
                            options.selected = true;
                        }
                    }
                    for(let i = 0; i < entries.length; i++){
                        const label = document.createElement('label');
                        const div = document.createElement('div');
                        label.textContent = titles[i];
                        div.appendChild(label);
                        div.appendChild(entries[i]);
                        divMain.appendChild(div);
                    }
                    divMain.appendChild(sendButton);             
                    formu.appendChild(divMain);

                    sendButton.addEventListener('click', () => {
                        const userSelected = document.createElement('input');
                        userSelected.type = 'hidden'                        
                        userSelected.name = 'userselected'
                        userSelected.value = user.name;                        
                        divMain.appendChild(userSelected);
                        formu.setAttribute('method', 'POST');
                        formu.setAttribute('action', '/updateuser/update');
                    })
                }else{
                    const message = document.createElement('p');
                    const hr = document.createElement('hr');
                    message.innerHTML = `Usuário ${username.value} Não encontrado!`
                    divMain.appendChild(hr);
                    divMain.appendChild(message);
                    formu.appendChild(divMain)
                }
                              
            }    
        };
        ajax.send(params1);
    });

})(window, document)

