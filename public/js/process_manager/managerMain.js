import {sectionsName} from '/js/builders/selectDatas.js';
import {createElements, clearContainer, appendElements, setAttributes} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';
const list =  document.getElementById('sectionslist');
const searchBar = document.getElementById('search');
const processList = document.getElementById('list');

window.addEventListener('load', () => {
    for(let i of sectionsName.slice(8).sort()){
        const div = createElements('div', {class: 'manager_body'});
        const label = createElements('label', {id: i}, i);        
        appendElements(div, [label]);
        appendElements(list, [div]);
    }
});

document.addEventListener('click', (e) => {    
    if(e.target.id === e.target.innerHTML && e.target.tagName.toLowerCase() === 'label'){
        document.getElementById('sectiontitle').innerHTML = e.target.innerHTML;  
        getValues(e.target.innerHTML);        
    }
    if(e.target.id === 'element' && e.target.tagName.toLowerCase() === 'button'){
        setAttributes(document.getElementById(e.target.value), {method: 'POST', action: `/acompanharprocessos/${e.target.value}`});        
    }
});

searchBar.addEventListener('keyup', async() => {    
    await getSearchValues();   
});

async function getValues(param){
    try {
        const processes = await request({
            method: 'POST',
            url:'/acompanharprocessos',
            params: `origin=${param}`
        });
        elementGenerator(processes)      
    } catch (error) {
        console.log(error)      
    }
}

async function getSearchValues(){
    try{
        const sectionTitle = document.getElementById('sectiontitle');
        const typeSearch = document.getElementById('typeofsearch');
        const searchBar = document.getElementById('search');
        const processes = await request({
            method: 'POST',
            url: '/acompanharprocessos/search',
            params: `origin=${sectionTitle.innerHTML}&type=${typeSearch.value}&search=${searchBar.value}`
        });        
        elementGenerator(processes);  
    }catch(error){
        console.log(error);
    }
}

function elementGenerator(processes){
    clearContainer(processList);
    createHeaderList();
    for(let i of processes){
        createBodyList(i);
    }   
}

function createHeaderList(){
    const headerDiv = createElements('div', {class: 'flexorientation--spaceb', style:'margin-left:15px;' });
    const searchP = document.getElementById('searchprocess');    
    const headerArray = ['Processo', 'Forma de Aquisição', 'Status']                    
    searchP.setAttribute('class', '');   
    processList.appendChild(headerDiv);
    for(let j of headerArray){
        const titleDiv = createElements('div', {class: 'manager_header'});
        const label = createElements('label', {}, j);        
        titleDiv.appendChild(label);
        headerDiv.appendChild(titleDiv);
    }
}

function createBodyList(process){    
    const form = createElements('form', {class: 'list_iten flexorientation--spaceb', id: process._id});
    const div1 = createElements('div', {class: 'manager_process_title'});
    const div2 = createElements('div', {class: 'manager_process_title'});
    const div3 = createElements('div', {class: 'manager_process_title'});     
    const element = createElements('button', {class: 'transparentbutton highlighted', id: 'element', value: process._id}, process.title);
    const elementID = createElements('input', {type: 'hidden', name: 'elementid', value: process._id});
    const date =  createElements('small', {style: 'display: block; margin-top: 5px;'}, `Inicio: ${process.date}`);   

    appendElements(div1, [element, date]);
    
    if(process.category){
        const processCtg = createElements('label', {}, process.category[0].toUpperCase() + process.category.substring(1));
        processCtg.innerHTML = process.category[0].toUpperCase() + process.category.substring(1);
        div2.appendChild(processCtg);
    }
    
    if(process.status.length > 0){
        const processStatus = createElements('label', {}, process.status.at(-1).state); 
        const processStatusDate = createElements('small', {style: 'display:block; margin-top:5px;'}, `Atualizado em: ${process.status.at(-1).date}`)                                 
        div3.setAttribute('title', process.status.at(-1).anotation);        
        div3.appendChild(processStatus);                            
        if(process.status.at(-1).anotation){
            const notes = createElements('img', {src: '/img/note.png', style: 'width:20px;'});
            div3.appendChild(notes);
        }
        div3.appendChild(processStatusDate);        
    }

    appendElements(form, [div1, div2, div3, elementID]);    
    processList.appendChild(form);
}