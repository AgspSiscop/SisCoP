import {appendElements, createSectionsSelect} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

window.addEventListener('load', async() => {    
    await getSections();
});

async function getSections(){
    try {
        const sections = await request({
            method: 'POST',
            url:'/novoprocesso/sections',
            params:''
        });
        generateSections(sections);
    } catch (error) {
        console.log(error);
    }
}

function generateSections(sections){
    const sectionsSelect = createSectionsSelect(sections, '','origin', 'origin');
    appendElements(document.getElementById('origindiv'), [sectionsSelect]);
}