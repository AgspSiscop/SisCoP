import { createSectionsSelect} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js'

window.addEventListener('load', () => {
    getSectionsValues();
});

async function getSectionsValues(){
    try {
        const sections = await request({
            method: 'POST',
            url:'/sections',
            params: ''
        });
        generateSectionsSelect(sections);            
    } catch (error) {
        console.log(error);        
    }
}

function generateSectionsSelect(sections){
    const sectionDiv = document.getElementById('sectiondiv');
    const select = createSectionsSelect(sections, 'section', 'section');
    sectionDiv.appendChild(select);    
}