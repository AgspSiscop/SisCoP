import {createElements, clearContainer, createContainer, appendElements, setAttributes} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';
const list =  document.getElementById('sectionslist');
const searchBar = document.getElementById('search');
const processList = document.getElementById('list');

window.addEventListener('load', () => {    
    getSections();
});

document.addEventListener('click', (e) => {
    const searchNext = document.getElementById('searchnext');
    const searchBack = document.getElementById('searchback');

    if(e.target.tagName.toLowerCase() === 'label'){
        const secDiv = document.getElementById('sectionslist');
        for(let i = 0; i < secDiv.children.length -1; i++){
            secDiv.children[i].setAttribute('class', 'manager_body');
        }
        secDiv.children[secDiv.children.length -1].lastChild.setAttribute('class', 'manager_body');
        e.target.parentElement.className = 'manager_body_selected'
        if(e.target.attributes.name.nodeValue === 'sectionslabel'){
            document.getElementById('sectiontitle').innerHTML = e.target.innerHTML;        
            getSearchValues(0);        
        }
    }    
    if(e.target.id === 'element' && e.target.tagName.toLowerCase() === 'button'){
        setAttributes(document.getElementById(e.target.value), {method: 'POST', action: `/acompanharprocessos/${e.target.value}`});        
    }    
    if(e.target.id === 'nextimg' && searchNext.className === 'arrow'){        
        getSearchValues(document.getElementById('searchindex').innerHTML);
    }
    if(e.target.id === 'backimg' && searchBack.className === 'arrow'){
        getSearchValues(document.getElementById('searchindex').innerHTML -2);
    }
});

searchBar.addEventListener('keyup', async() => {    
    await getSearchValues(0);
});

async function getSections(){
    try {
        const sections = await request({
            method: 'POST',
            url: 'requests/sections1'
        });        
        generateSections(sections);
    } catch (error) {
        console.log(error);        
    }
}

async function getSearchValues(number){
    try{
        const sectionTitle = document.getElementById('sectiontitle');
        const typeSearch = document.getElementById('typeofsearch');
        const searchBar = document.getElementById('search');
        const processes = await request({
            method: 'POST',
            url: `/requests/manager/search${String(number)}`,
            params: `origin=${sectionTitle.innerHTML}&type=${typeSearch.value}&search=${searchBar.value}`
        });        
        elementGenerator(processes, number);  
    }catch(error){
        console.log(error);
    }
}

function elementGenerator(processes, number){
    clearContainer(processList);
    createHeaderList();
    for(let i of processes.processes){
        createBodyList(i);
    }   
    generateArrows(processes, 10, parseInt(number))
}

function generateSections(sections){
    for(let i of sections){
        const div = createElements('div', {class: 'manager_body'});
        const label = createElements('label', {id: i._id, name: 'sectionslabel'}, i.name);        
        appendElements(div, [label]);
        appendElements(list, [div]);
    }
         
    const generalLabel = createElements('label', {id: '', name: 'sectionslabel'}, 'Busca Geral');
    const generalDiv = createContainer('div', {class: 'manager_body'}, [generalLabel]);
    const div = createContainer('div', {}, [document.createElement('br'), generalDiv])
    appendElements(list, [div]);
}

function createHeaderList(){
    const headerDiv = createElements('div', {class: 'flexorientation--spaceb margin_medium'});
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
    const form = createElements('form', {class: 'list_manager flexorientation--spaceb margin_medium', id: process._id});
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
        const processStatus = createElements('p', {style:  'display:inline'}, process.status.at(-1).state); 
        const processStatusDate = createElements('small', {style: 'display:block; margin-top:5px;'}, `Atualizado em: ${process.status.at(-1).date}`)                                 
        div3.setAttribute('title', process.status.at(-1).anotation);        
        div3.appendChild(processStatus);                            
        if(process.status.at(-1).anotation){
            const notes = createElements('img', {src: '/img/note.png', style: 'width:20px;'});
            div3.appendChild(notes);
        }
        colorStates(process.status.at(-1).state, div3);
        
        div3.appendChild(processStatusDate);        
    }

    appendElements(form, [div1, div2, div3, elementID]);    
    processList.appendChild(form);
}

function generateArrows(processes, elementsInPage, number){
    const searchIndex = createElements('p', {id: 'searchindex', style: 'padding-top:35px;', class: 'footer_index'}, number +1);
    const aNext = createContainer('a', {id: 'searchnextlink'},[createElements('img', {src: '/img/seta.png', style: 'height: 20px; width: 20px;', id: 'nextimg'})]);
    const searchNext = createContainer('div', {class: 'arrow_disabled', id: 'searchnext'}, [aNext]);
    const aBack = createContainer('a', {id: 'searchbacklink'},[createElements('img', {src: '/img/seta2.png', style: 'height: 20px; width: 20px;', id: 'backimg'})]);
    const searchBack = createContainer('div', {class: "arrow_disabled", id: 'searchback'}, [aBack]);
    const searchArrows = createContainer('div', {class: 'flexorientation--spaceb', id: 'searcharrow'},[searchBack, searchIndex,searchNext]);    
    if(processes.count -((number + 1) * elementsInPage) > 0){ 
        searchNext.setAttribute('class', 'arrow');
    }
    if((number+1) > 1){
        searchBack.setAttribute('class', 'arrow');
    }
    processList.appendChild(searchArrows) 
}

function colorStates(state, block){
    if(state == 'Processo Cadastrado'){
        setAttributes(block, {class: 'manager_main_state create_state'});        
    }
    else if(state == 'Coleta de Orçamentos'){
        setAttributes(block, {class: 'manager_main_state getbudgets_state'});
    }
    else if(state == 'Em Montagem'){
        setAttributes(block, {class: 'manager_main_state inprocess_state'});
    }
    else if(state == 'Montagem Finalizada'){
        setAttributes(block, {class: 'manager_main_state makedone_state'});
    }
    else if(state == 'Em Transferência'){;
        setAttributes(block, {class: 'manager_main_state intransfer_state'});
    }
    else if(state == 'Em Análise'){
        setAttributes(block, {class: 'manager_main_state analysis_state'});
    }
    else if(state == 'Outro'){
        setAttributes(block, {class: 'manager_main_state other_state'});
    }
    else if(state == 'Retificando Processo'){
        setAttributes(block, {class: 'manager_main_state rectifying_state'});
    }
    else if(state == 'Processo Concluído'){
        setAttributes(block, {class: 'manager_main_state processdone_state'});
    }else{        
        setAttributes(block, {class: 'manager_main_state processdone_state'});        
    }
}