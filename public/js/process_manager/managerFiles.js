import {createElements, clearContainer, appendElements, setAttributes, createContainer} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

window.addEventListener('load', () =>{
    if(document.getElementById('list')){
        getValues();
    }
});


async function getValues(){
    try {
        console.log(document.URL)
        const documents = await request({
            method: 'POST',
            url: `${document.URL}/files`,
            params:''
        });
        generateFiles(documents);        
    } catch (error) {
        console.log(error)        
    }
}

function generateFiles(documents){
    const list = document.getElementById('list');
    const year = document.getElementById('year');
    const done = document.getElementById('done');
    for(let i of documents){
        const file = createElements('input', {type: 'submit', class: 'manager_button highlighted', value: i.name});       
        const form = createContainer('form', {name: 'fileform', target: '_blank', method: 'POST', action: `/acompanharprocessos/${year.innerHTML}/${done.value}/${i.name}`}, [file]);
        list.appendChild(form);       
    }

}