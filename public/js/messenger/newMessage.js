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