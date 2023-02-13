import {createElements, clearContainer, appendElements} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';
const formMain = document.getElementById('deleteone');
const divMain = document.createElement('div');
const username = document.getElementById('username');

document.addEventListener('click', (e) => {
    const element = e.target.id;
    if(element === 'usernamebutton'){        
        getValues();       
    }
    if(element === 'confirmbutton'){        
        formMain.setAttribute('action', '/deleteuser/delete');
        formMain.setAttribute('method', 'POST');
    }
    if(element === 'cancelbutton'){
        e.preventDefault();
        location.reload();
    }
});

async function getValues(){
    try {        
        const user = await request({
            method:'POST',
            url:'/getuser',
            params: `name=${username.value}`
        });
        elementsGenerator(user);        
    } catch (error) {
        console.log(error);
    }
}

function elementsGenerator(user){
    clearContainer(divMain);
    if(user){                
        const title = createElements('p',{}, `Você tem certeza que dejesa apagar o usuário ${user.name}?`);
        const name = createElements('input', {type: 'hidden', value: user.name, name: 'name'});
        const pg = createElements('small', {}, `Posto/Graduação: ${user.pg}`);
        const section = createElements('small', {}, `Seção: ${user.section.name}`);
        const level = createElements('small', {}, `level: ${user.level}`);
        const confirmButton = createElements('input', {class: 'button', type: 'submit', value: 'Apagar', id: 'confirmbutton'});
        const cancelButton = createElements('input', {class: 'redbutton', type: 'submit', value: 'Cancelar', id: 'cancelbutton'});
        const buttonDiv = createElements('div', {class: 'flexorientation--spacea'});
        const descriptionDiv = createElements('div', {class: 'user_description'});

        appendElements(buttonDiv, [confirmButton, cancelButton]);
        appendElements(descriptionDiv, [pg, section, level]);
        appendElements(divMain, [document.createElement('hr'), title, name,descriptionDiv, buttonDiv]);
        appendElements(formMain, [divMain]);
    }else{             
        const title = createElements('p',{}, `Usuário <b>${username.value}</b> não encontrado!`);
        appendElements(divMain, [document.createElement('hr'), title]);
        appendElements(formMain, [divMain]);
    }
}
