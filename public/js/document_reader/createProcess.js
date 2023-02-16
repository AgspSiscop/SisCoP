import {appendElements, createSectionsSelect, setAttributes, createElements} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

window.addEventListener('load', async() => {    
    await getSections();
});

document.addEventListener('click', (e) => {
    const element = e.target;

    if(element.id === 'submitprocess'){
        const form = document.getElementById('formp');
        const year = createElements('input', {type: 'hidden', name: 'year', value: (new Date).getFullYear()});
        form.appendChild(year);
        setAttributes(form, {method: 'POST', action: '/novoprocesso/cadastro'});
    }
})

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