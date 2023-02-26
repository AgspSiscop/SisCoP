import {pg as pgOptions} from '/js/builders/selectDatas.js';
import {createElements, createSelect, clearContainer, appendElements, createSectionsSelect} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

const formu = document.getElementById('formu');
const divMain = document.createElement('div');

document.addEventListener('click', (e) => {    
    const element = e.target.id;
    if(element === 'usernamebutton'){        
        getValues();                      
     }
     if(element === 'update'){           
        formu.setAttribute('method', 'POST');
        formu.setAttribute('action', '/updateuser/update');
    }
});

async function getValues() {
    try {
        const username = document.getElementById('username');
        const user = await request({
            method: 'POST',
            url: `/getuser`,
            params: `name=${username.value}`
        });
        const sections = await request({
            method: 'POST',
            url: '/sections',
            params: ''
        });      
        elementsGenerator(user, sections);
    } catch (error) {
        console.log(error);
    }
}

function elementsGenerator(user, sections){
    clearContainer(divMain);
    if(user){        
        const titles = ['Nome:', 'Senha:', 'Posto/Graduação', 'Seção:', 'Level:', '', ''];        
        const name = createElements('input', {type: 'text', value: user.name, name: 'name'});        
        const password = createElements('input', {type: 'password', name: 'password'});        
        const level = createElements('input', {type: 'text', value: user.level, name: 'level'});        
        const sendButton = createElements('input', {type: 'submit', value: 'atualizar', class: 'button', id: 'update'});       
        const userSelected = createElements('input', {type: 'hidden', value: user.name, name: 'userselected'});
        const pg = createSelect(pgOptions, pgOptions, user.pg, 'pg');
        const section = createSectionsSelect(sections, user.section._id, 'section', 'section');        
        const entries = [name, password, pg, section, level, userSelected, sendButton];        
        appendUpdateElements(titles, entries);
    }else{
        const username = document.getElementById('username');
        const message = createElements('p', {}, `Usuário <b>${username.value}</b> Não encontrado!`);    
        appendElements(divMain, [document.createElement('hr'), message]);
        appendElements(formu, [divMain]); 
    }
}

function appendUpdateElements(titles, entries){
    appendElements(divMain, [document.createElement('hr')]);
    for(let i = 0; i < entries.length; i++){
        const label = document.createElement('label');
        const div = document.createElement('div');
        label.textContent = titles[i];
        appendElements(div, [label, entries[i]]);
        appendElements(divMain, [div]);            
    }
    appendElements(formu, [divMain]);
}
