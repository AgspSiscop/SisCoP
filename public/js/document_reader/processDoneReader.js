import {createElements, clearContainer, createContainer, createYearSelect, setAttributes, appendElements} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js'


let list = document.getElementById('list');

window.addEventListener('load', () => {
    getYearValues();
})

document.addEventListener('change', (e) => {
    const element = e.target;
    if(element.id === 'year'){
        getValues();
    }
});

async function getValues(){
    try {
        let  year = document.getElementById('year');
        const processes = await request({
            method: 'POST',
            url:'/requests/processdone',
            params:`year=${year.value}`
        });      

        generateElements(processes);        
    } catch (error) {
        console.log(error);
    }
}

async function getYearValues(){
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
    const label = createElements('label',{}, 'Ano: ');
    const years = createYearSelect(values, 'year', 'year');
    appendElements(yearDiv, [label, years]);
}

function generateElements(processes){
    clearContainer(list);

    for(let i of processes){       
        const process = createElements('input', {type: 'submit', class: 'transparentbutton highlighted', value: `${i.title} - nup: ${i.nup.replace(/([0-9]{5})([0-9]{6})([0-9]{4})([0-9]{2})/, '$1.$2/$3-$4')}`});
        const date = createElements('small', {style: 'display: block; margin-top: 5px; margin-left: 5px;'}, i.date);            
               
        const form = createContainer('form', {class: 'list_iten'}, [process, date]);        
        list.appendChild(form);
        
        document.addEventListener('click', (e) =>{
            const element = e.target;        
            
            if(element === process){                
                setAttributes(form, {method: 'POST', action: `concluidos/${year.value}/${i._id}`});                
                            
            }            
        });
    }
}