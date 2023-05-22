import {createElements, createSelect, createContainer} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js'

const formp = document.getElementById('formp')
const inputFile = document.getElementById('file')
const spanName = document.getElementById('filename')
const tr = document.getElementById('TR')
const ac = document.getElementById('AC')
const dfd = document.getElementById('DFD')
const ca = document.getElementById('CA');
const dr = document.getElementById('DR');

inputFile.value = '' //resets when page is reloaded

window.addEventListener('load', () => {
    createMembers(1);
    getSectionsValues();
    
});

async function getSectionsValues() {
    try {
        const sections = await request({
            method: 'POST',
            url: '/requests/sections1',
            params: ''
        });

        generateSectionsSelect(sections);        
    } catch (error) {
        console.log(error);     
    }
}

function generateSectionsSelect(sections) {
    const sectorSelect = document.getElementById('sectorselect')
    const sectionsV = [];
    const sectionsN = sections.map(element => element.name);
    sections.forEach(element => {        
        if (element.name.split(' ')[0] !== 'Divisão' && element.name.split(' ')[0] !== 'Companhia' ) {
            element.name =`Seção de ${element.name}`;
        }
        sectionsV.push(element.name);
    });
    const sectionsSelect = createSelect(sectionsV, sectionsN, '', 'sector', '');
    sectorSelect.appendChild(sectionsSelect);
}

function createMembers(number){
    const membersDiv = document.getElementById('membersdiv');
    const nameLabel = createElements('label', {}, `Membro ${number}:`);
    const name = createElements('input', {type: 'text', name: 'resp', class: 'mediumtext'});
    const pstGLabel =  createElements('label', {}, 'Posto/Grad:');
    const pstGArrayV = ['0', 'Cel', 'Tc', 'Maj', 'Cap', '1º Ten', '2º Ten', 'Asp', 'Sub Ten', '1º Sgt', '2º Sgt', '3º Sgt', 'Cb', 'Sd'];
    const pstGArray = ['', 'Cel', 'Tc', 'Maj', 'Cap', '1º Ten', '2º Ten', 'Asp', 'Sub Ten', '1º Sgt', '2º Sgt', '3º Sgt', 'Cb', 'Sd'];
    const pstGSelect = createSelect(pstGArrayV, pstGArray, '', 'resppg');
    const functionLabel = createElements('label', {}, 'Cargo/Função:');
    const functionInput = createElements('input', {type: 'text', class: 'mediumtext', name: 'role'});
    const div1 = createContainer('div', {}, [nameLabel, name]);
    const div2 = createContainer('div', {}, [pstGLabel, pstGSelect]);
    const flexDiv = createContainer('div', { class: 'display-flex-start'}, [div1, div2]);
    const div3 = createContainer('div', {}, [functionLabel, functionInput]);
    const mainDiv = createContainer('div', {}, [document.createElement('hr'), flexDiv, div3]);    
    if(number === 1){
        name.placeholder = 'Este Deve Ser O Integrante Mais Antigo'
    }
    membersDiv.appendChild(mainDiv);
    createMoreM()

    
}
function createMoreM(){
    const membersDiv = document.getElementById('membersdiv');
    const buttonsML = document.getElementById('buttonsml')
    const moreButon = createElements('button', {class: 'button', id: 'more'}, '+');
    const lessButton = createElements('button', {class: 'button', id: 'less'}, '&nbsp;-&nbsp;');
    
    if(membersDiv.children.length == 1 && buttonsML.children.length == 0){
        buttonsML.appendChild(moreButon);
    }else if(membersDiv.children.length == 10){
        buttonsML.removeChild(document.getElementById('more'));
    }else if(membersDiv.children.length == 9 && buttonsML.children.length == 1){           
        buttonsML.prepend(moreButon);
    }   

    if(membersDiv.children.length == 2 && buttonsML.children.length == 1){
        buttonsML.appendChild(lessButton);
    }else if(membersDiv.children.length == 1 && buttonsML.children.length == 2){
        buttonsML.removeChild(document.getElementById('less'));               
    }    

}

inputFile.addEventListener('change', () => {
    let text = inputFile.value.split("\\");    
    spanName.textContent = text[2];    
    //tr.setAttribute('class','button');    
    ac.setAttribute('class','button');    
    dfd.setAttribute('class','button');    
    //ca.setAttribute('class','button');    
    dr.setAttribute('class','button');

});


document.addEventListener('click', (e) => {
    const element = e.target;
    if(element === ac){
        formp.setAttribute('action', '/montagem/analise_critica');
        formp.setAttribute('target', '_blank');
        formp.setAttribute('enctype', 'multipart/form-data');
    }
    if(element === tr){
        formp.setAttribute('action', '/montagem/TR');
        formp.setAttribute('target', '_blank');
        formp.setAttribute('enctype', 'multipart/form-data')
    }
    if(element === dfd){
        formp.setAttribute('action', '/montagem/DFD');
        formp.setAttribute('target', '_blank');
        formp.setAttribute('enctype', 'multipart/form-data');
    }
    if(element === ca){
        formp.setAttribute('action', '/montagem/CA');
        formp.setAttribute('target', '_blank');
        formp.setAttribute('enctype', 'multipart/form-data'); 
    }
    if(element === dr){
        formp.setAttribute('action', '/montagem/DiexReq');
        formp.setAttribute('target', '_blank');
        formp.removeAttribute('enctype')        
    }
    if(element.id === 'more'){
        e.preventDefault();
        const membersDiv = document.getElementById('membersdiv');
        createMembers(membersDiv.children.length +1);
    }
    if(element.id === 'less'){
        e.preventDefault();
        const membersDiv = document.getElementById('membersdiv');
        membersDiv.removeChild(membersDiv.lastChild);
        createMoreM();
    }
})




