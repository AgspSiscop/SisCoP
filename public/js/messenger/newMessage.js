import {createElements, createSelect, createMessageUsersSelect, createYearSelect, createMessageProcessesSelect,clearContainer, appendElements, createSectionsSelect} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';
const receiver = document.getElementById('receiver');

window.addEventListener('load', () => {
    generateElements();
    getYearsValues();   
});

function generateElements(){
    const selectMethod = document.getElementById('selectmethod');
    const method = createSelect(['', 'section', 'user'], ['', 'Seção', 'Usuário'], '', 'method', 'method');
    selectMethod.appendChild(method)
}

async function getYearsValues(){
    try {
        const year = await request({
            method: 'POST',
            url: '/requests/allyears',
            params: ''
        });
        generateYears(year);        
    } catch (error) {
        console.log(error);        
    }
}

function generateYears(values){
    const yearDiv = document.getElementById('yeardiv');
    const label = createElements('label',{}, 'Processo: ');
    const years = createYearSelect(values, 'year', 'year');
    appendElements(yearDiv, [label, years]);
}

document.addEventListener('change', async (e) =>{
    const element = e.target;
    
    if(element.id === 'year'){
        const yearSelected = element.children[element.selectedIndex].value;
         if(yearSelected !== ''){
             getProcessValues();
         }else{
            clearContainer(document.getElementById('selectprocess'));
         }
    }
    if(element.id === 'method'){
        const methodSelected = element.children[element.selectedIndex].value;
        clearContainer(document.getElementById('receiver'));
        clearContainer(document.getElementById('selectsection'));
        if(methodSelected === 'section'){
            getSectionsValues();                      
        }
        if(methodSelected === 'user'){            
           await getUserValues();
        }        
    }    
});

document.addEventListener('click', (e) => {
    const element =  e.target;
    
    if(element.id === 'submitformm'){
        
        const formm = document.getElementById('formm');
        const editor = document.getElementById('content');
        const messageContent = createElements('input', {type: 'hidden', name: 'content'});
        const method = document.getElementById('method');
        const methodSelected = method.children[method.selectedIndex].value;
        let selectProcess =  document.getElementById('process') || null;               

        formm.appendChild(messageContent);
        messageContent.value = editor.innerHTML;        
        
        if(methodSelected === 'user'){
            if(selectProcess == null){                
                userNoProcessSend()
            }else{                          
                if(selectProcess.children.length > 0){                    
                    userProcessSend(selectProcess);
                }else{
                    userNoProcessSend()
                }
            }           
        }
        if(methodSelected === 'section'){
            if(selectProcess == null){
                sectionNoProcessSend();
            }else{
                if(selectProcess.children.length > 0){
                    const formm = document.getElementById('formm');
                    const processSelected = selectProcess.children[selectProcess.selectedIndex].innerHTML;                                     
                    formm.setAttribute('action', `/mensageiro/nova/section/${processSelected}`);
                }else{
                    sectionNoProcessSend();
                }
            }            
        }
    }
    if(element.tagName === 'BUTTON' || element.tagName === 'IMG'){
        e.preventDefault();        
    }
})

function userNoProcessSend(){
    const formm = document.getElementById('formm');
    let title = 'Mensagem sem Processo'
    formm.setAttribute('action', `/mensageiro/novasemprocesso/user/${title}`);
}

function sectionNoProcessSend(){
    const formm = document.getElementById('formm');
    let title = 'Mensagem sem Processo'
    formm.setAttribute('action', `/mensageiro/novasemprocesso/section/${title}`);
}

function userProcessSend(selectProcess){
    const formm = document.getElementById('formm');
    const processSelected = selectProcess.children[selectProcess.selectedIndex].innerHTML;
    const user = document.getElementById('user')
    const userSelected = user.children[user.selectedIndex].innerHTML;
    const username = createElements('input', {type:'hidden', id: 'username', name: 'username', value: userSelected})
    formm.appendChild(username);                    
    formm.setAttribute('action', `/mensageiro/nova/user/${processSelected}`);
}

async function getUserValues(){    
    try {        
        const users = await request({
            method: 'POST',
            url: '/requests/users',
            params: ''
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
            url: '/requests/messageprocesses',
            params: `year=${year.value}`
        });
        generateProcesses(processes);
    } catch (error) {
        console.log(error);
    }
}

async function getSectionsValues(){    
    try {
        const sections = await request({
            method: 'POST',
            url:'/requests/sections9',
            params: ''
        });
        generateSections(sections)        
    } catch (error) {
        console.log(error);
    }
}

function generateUsers(users){               
    const usersSelect = createMessageUsersSelect(users, 'user', 'user');            
    const labelUsers = createElements('label', {style: 'margin-left: 10px'}, 'Usuário:');
    appendElements(receiver, [labelUsers, usersSelect]);    
}

function generateProcesses(processes){
    const process = document.getElementById('selectprocess');
    clearContainer(process);
    const selectProcess = createMessageProcessesSelect(processes, 'process', 'process');    
    appendElements(process, [selectProcess]);
}

function generateSections(sections){
    const selectSections = document.getElementById('selectsection');
    const messageSections = createSectionsSelect(sections, '', 'messagesection', 'messagesection');
    const sectionsLabel = createElements('label', {style: 'margin-left: 10px;'}, 'Seção:');  
    appendElements(selectSections, [sectionsLabel, messageSections]);
}

