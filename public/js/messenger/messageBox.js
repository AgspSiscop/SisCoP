import {createElements,clearContainer, createContainer} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

const search =  document.getElementById('search');

window.addEventListener('load', () => {
    getSearchValues(0);

});

search.addEventListener('keyup', async () => {    
    await getSearchValues(0);
});

document.addEventListener('click', (e) => {    
    const searchNext = document.getElementById('searchnext');
    const searchBack = document.getElementById('searchback');
    if(e.target.id === 'nextimg' && searchNext.className === 'arrow'){        
        getSearchValues(document.getElementById('searchindex').innerHTML);
    }
    if(e.target.id === 'backimg' && searchBack.className === 'arrow'){
        getSearchValues(document.getElementById('searchindex').innerHTML -2);
    }
});

async function getSearchValues(number){
    try {
        const local = getLocal();      
        const search =  document.getElementById('search');
        const typeSearch = document.getElementById('typeofsearch');
        const messages = await request({
            method: 'POST',
            url: `/requests/${local}/search${String(number)/*.padStart(3, 0)*/}`,
            params: `type=${typeSearch.value}&search=${search.value}`
        });        
        generateElements(messages, number);        
    } catch (error) {
        console.log(error);        
    }
}

function getLocal(){
    if(document.URL.split('/')[4] === 'caixadeentrada'){
        return 'inbox';
    }
    if(document.URL.split('/')[4] === 'enviadas'){
        return 'sent'
    }
    if(document.URL.split('/')[4] === 'arquivadas'){
        return 'archived'
    }
    
}

function generateElements(messages, number){
    const local = getLocal();
    const mainContainer = document.getElementById('maincontainer');
    clearContainer(mainContainer);
    
    for(let i of messages.messages){        
        const delImg = createElements('img', {src: '/img/trash.png', style: 'height: 16px;'});
        const delButton = createContainer('button', {class: 'redbutton deletemsg', style: 'margin-top: 0px;'}, [delImg]);
        const delForm = createContainer('form', {method: 'POST', action: `${document.URL}/${i._id}/delete`, class: 'formmessage'}, [delButton]);
        const archImg = createElements('img', {src: '/img/archive.png', style: 'height: 16px;'});
        const archButton = createContainer('button', {class: 'yellowbutton archivemsg', style: 'margin-top: 0px;'}, [archImg]);
        const archForm = createContainer('form', {method: 'POST', action: `caixadeentrada/${i._id}/archive`, class: 'formmessage'}, [archButton]);
        const divFather = createContainer('div', {class: 'flexorientation--spaceb list_iten'}, []);
        const a = createContainer('a', {href: `${document.URL}/${i._id}`, class: 'message_style'}, [divFather]);
        
        if(i.section_receiver){
            for(let j of [i.title, i.process_title, i.section_receiver.name, i.date]){
                let div = createContainer('div', {class: 'messenger_body'},[createElements('label', {}, j)]);
                divFather.appendChild(div);
            }
        }else{
            if(local === 'sent'){
                for(let j of [i.title, i.process_title, `${i.receiver.pg} ${i.receiver.name}`,i.date]){
                    let div = createContainer('div', {class: 'messenger_body'},[createElements('label', {}, j)]);
                    divFather.appendChild(div);
                }
                
            }
            if(local === 'inbox'){
                for(let j of [i.title, i.process_title, `${i.sender.pg} ${i.sender.name}`,i.date]){
                    let div = createContainer('div', {class: 'messenger_body'},[createElements('label', {}, j)]);                    
                    divFather.appendChild(div);                    
                }                
                divFather.appendChild(archForm)
            }
            if(local === 'archived'){
                for(let j of [i.title, i.process_title, `${i.sender.pg} ${i.sender.name}`,i.date]){
                    let div = createContainer('div', {class: 'messenger_body'},[createElements('label', {}, j)]);                    
                    divFather.appendChild(div);                    
                }                                
            }
        }
    
        divFather.appendChild(delForm);
        mainContainer.appendChild(a);
    }   
    mainContainer.appendChild(generateArrows(messages, 15, parseInt(number)));      
}

function generateArrows(messages, elementsInPage, number){
    const searchIndex = createElements('p', {id: 'searchindex', style: 'padding-top:35px;', class: 'footer_index'}, number +1);
    const aNext = createContainer('a', {id: 'searchnextlink'},[createElements('img', {src: '/img/seta.png', style: 'height: 20px; width: 20px;', id: 'nextimg'})]);
    const searchNext = createContainer('div', {class: 'arrow_disabled', id: 'searchnext'}, [aNext]);
    const aBack = createContainer('a', {id: 'searchbacklink'},[createElements('img', {src: '/img/seta2.png', style: 'height: 20px; width: 20px;', id: 'backimg'})]);
    const searchBack = createContainer('div', {class: "arrow_disabled", id: 'searchback'}, [aBack]);
    const searchArrows = createContainer('div', {class: 'flexorientation--spaceb', id: 'searcharrow'},[searchBack, searchIndex,searchNext]);    
    if(messages.count -((number + 1) * elementsInPage) > 0){ 
        searchNext.setAttribute('class', 'arrow');
    }
    if((number+1) > 1){
        searchBack.setAttribute('class', 'arrow');
    }
    return searchArrows;
}