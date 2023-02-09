import {sectionsName} from '/js/builders/selectDatas.js';
import {createElements, createSelect, appendElements, setAttributes} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

window.addEventListener('load', () => {
    const sections = createSelect(sectionsName.slice(8).sort(), sectionsName.slice(8).sort(), '', 'origin', 'origin');
    appendElements(document.getElementById('origindiv'), [sections]);            

});
