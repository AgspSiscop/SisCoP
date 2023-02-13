import {appendElements, createSectionsSelect} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

window.addEventListener('load', () => {    
    getSections();    
});

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