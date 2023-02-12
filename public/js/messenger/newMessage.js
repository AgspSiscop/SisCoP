import {sectionsName} from '/js/builders/selectDatas.js';
import {createElements, createSelect, createMessageUsersSelect, createMessageProcessesSelect,clearContainer, appendElements} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';
const receiver = document.getElementById('receiver');

window.addEventListener('load', () => {
    generateElements();
});

function generateElements(){
    const selectMethod = document.getElementById('selectmethod');
    const method = createSelect(['', 'section', 'user'], ['', 'Seção', 'Usuário'], '', 'method', 'method');
    selectMethod.appendChild(method)
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
            console.log('aqui')
           await getUserValues();
        }        
    }    
});

function getSectionsValues(){
    const selectSections = document.getElementById('selectsection');
    const sectionsLabel = createElements('label', {style: 'margin-left: 10px;'}, 'Seção:');                        
    const sections = createSelect(sectionsName.slice(2).sort(), sectionsName.slice(2).sort(), '', 'messagesection', 'messagesection'); //alterar quando passar pro banco de dados
    appendElements(selectSections, [sectionsLabel, sections]); 

}

document.addEventListener('click', (e) => {
    const element =  e.target;
    
    if(element.id === 'submitformm'){
        
        const formm = document.getElementById('formm');
        const editor = document.getElementById('content');
        const messageContent = createElements('input', {type: 'hidden', name: 'content'});
        const method = document.getElementById('method');
        const methodSelected = method.children[method.selectedIndex].value;
        let selectProcess =  document.getElementById('process') || null;        
        let title;        

        formm.appendChild(messageContent);
        messageContent.value = editor.innerHTML;
        
        /*if(select == null){
            console.log('aqui')
            title = 'Menssagem sem Processo';
            formm.setAttribute('action', `/mensageiro/novasemprocesso/user/${title}`);         
        }else{
            if(select.children.length > 0){
                title = document.getElementById(select.value).innerHTML
                formm.setAttribute('action', `/mensageiro/nova/${title}`);
            }
        }*/
        /*if(receiver.hasChildNodes()){        
            const select = document.getElementById('user');
                  
           
        }*/
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
/*document.getElementById('submitformm').addEventListener('click', () =>{
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
});*/

async function getUserValues(){    
    try {        
        const users = await request({
            method: 'POST',
            url: '/mensageiro/users',
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
    const labelUsers = createElements('label', {style: 'margin-left: 10px'}, 'Usuário:');
    appendElements(receiver, [labelUsers, usersSelect]);    
}

function generateProcesses(processes){
    const process = document.getElementById('selectprocess');
    clearContainer(process);
    const selectProcess = createMessageProcessesSelect(processes, 'process', 'process');    
    appendElements(process, [selectProcess]);
}

