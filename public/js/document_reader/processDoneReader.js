import {createElements, clearContainer, createContainer, setAttributes, appendElements} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js'

let  year = document.getElementById('year');
let list = document.getElementById('list');

year.addEventListener('change', () => {
    getValues();
});

async function getValues(){
    try {
        const processes = await request({
            method: 'POST',
            url:'/concluidos/processes',
            params:`year=${year.value}`
        });      

        generateElements(processes);        
    } catch (error) {
        console.log(error);
    }
}

function generateElements(processes){
    clearContainer(list);

    for(let i of processes){       
        const process = createElements('input', {type: 'submit', class: 'transparentbutton highlighted', value: `${i.title} / nup: ${i.nup}`});
        const date = createElements('small', {style: 'display: block; margin-top: 5px; margin-left: 5px;'}, i.date);            
               
        const form = createContainer('form', {class: 'list_iten'}, [process, date]);        
        list.appendChild(form);
        
        document.addEventListener('click', (e) =>{
            const element = e.target;        
            
            if(element === process){                
                setAttributes(form, {method: 'POST', action: `concluidos/${year.value}/${i.done_dir}`});                
                            
            }            
        });
    }
}