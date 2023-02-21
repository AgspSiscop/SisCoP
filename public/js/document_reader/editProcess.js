import {appendElements, createSectionsSelect, setAttributes} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

window.addEventListener('load', () => {    
    getSections();    
});

document.addEventListener('click', (e) => {
    const element = e.target;
    console.log(`/${document.URL.split('/')[3]}/${document.URL.split('/')[4]}/edit/${document.URL.split('/')[6]}`)

    if(element.id === 'submitedit'){
        const formEdit = document.getElementById('formedit');
        setAttributes(formEdit, {method: 'POST', action: `/${document.URL.split('/')[3]}/${document.URL.split('/')[4]}/edit/${document.URL.split('/')[6]}`})
    }
})

async function getSections(){
    try {
        const url = document.URL.split('/');
        const sections = await request({
            method: 'POST',
            url:'/novoprocesso/sections',
            params:``
        });
        const processSection = await request({
            method: 'POST',
            url: '/novoprocesso/processsection',
            params: `process=${url[url.length-1]}`
        })
        generateSections(sections, processSection);
    } catch (error) {
        console.log(error);
    }
}

function generateSections(sections, processSection){
    const sectionsSelect = createSectionsSelect(sections, processSection.origin,'origin', 'origin');
    appendElements(document.getElementById('origindiv'), [sectionsSelect]);
}