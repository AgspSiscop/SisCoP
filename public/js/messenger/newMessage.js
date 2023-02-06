import {sectionsName} from '/js/builders/selectDatas.js';
import {createElements, createSelect, createMessageUsersSelect, createMessageProcessesSelect,clearContainer, appendElements} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';
const receiver = document.getElementById('receiver');

window.addEventListener('load', () => {
    if(document.getElementById('sectionvalue').value === 'Chefe da SALC'){
        const sections = createSelect(sectionsName.slice(2).sort(), sectionsName.slice(2).sort(), '', 'messagesection', 'messagesection');
        appendElements(document.getElementById('selectsection'), [sections]);            
    }else{
        const sections = createSelect(sectionsName.slice(3).sort(), sectionsName.slice(3).sort(), '', 'messagesection', 'messagesection');
        appendElements(document.getElementById('selectsection'), [sections]);
    }      
});

document.addEventListener('change', (e) =>{
    const element = e.target.id;
    if(element === 'messagesection'){
        clearContainer(receiver);
        if(e.target.value === 'SALC'){
            getUserValues();
        }
    }
    if(element === 'year'){        
        getProcessValues();
    }
});

document.getElementById('submitformm').addEventListener('click', () =>{
    const formm = document.getElementById('formm');
    let select =  document.getElementById('process') || null;
    let title;    
    
    if(select == null){
        title = 'Menssagem sem Processo';
        formm.setAttribute('action', `/mensageiro/novasemprocesso/${title}`);         
    }else{
        title = document.getElementById(select.value).innerHTML
        formm.setAttribute('action', `/mensageiro/nova/${title}`);
    }
    if(receiver.hasChildNodes()){        
        const select = document.getElementById('user');
        const text = select.children[select.selectedIndex];
        const username = createElements('input', {name: 'username', value: text.textContent});        
        formm.appendChild(username);
    }
});

async function getUserValues(){
    try {
        const sections = document.getElementById('messagesection');
        const users = await request({
            method: 'POST',
            url: '/mensageiro/users',
            params: `'section=${sections.value}`
        });
        generateUsers(users);       
    } catch (error) {
        console.log(error);        
    }
}

async function getProcessValues(){
    try {
        const year = document.getElementById('year');
        const processes = await request({
            method: 'POST',
            url: '/mensageiro/processes',
            params: `year=${year.value}`
        });
        generateProcesses(processes);
    } catch (error) {
        console.log(error);
    }
}

function generateUsers(users){               
    const usersSelect = createMessageUsersSelect(users, 'user', 'user');            
    const labelUsers = createElements('label', {}, 'Usuário:');
    appendElements(receiver, [labelUsers, usersSelect]);    
}

function generateProcesses(processes){
    const process = document.getElementById('selectprocess');
    clearContainer(process);
    const selectProcess = createMessageProcessesSelect(processes, 'process', 'process');
    console.log(selectProcess.value.textContent)
    appendElements(process, [selectProcess]);
}


/*(function readyJS(){
    'use strict';
    console.log(document)
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

})(window, document)*/

