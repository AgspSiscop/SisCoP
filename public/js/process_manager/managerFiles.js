import {createElements, setAttributes, createContainer} from '/js/builders/elementsFunctions.js';
import {request} from '/js/builders/ajax.js';

window.addEventListener('load', () =>{
    getStates();

    if(document.getElementById('list')){
        getValues();        
    }
});


async function getValues(){
    try {        
        const documents = await request({
            method: 'POST',
            url: `/requests/documents`,
            params: `id=${document.URL.split('/')[4]}`
        });        
        generateFiles(documents);              
    } catch (error) {
        console.log(error);        
    }
}

async function getStates(){
    try {
        const states = await request({
            method: 'POST',
            url: `/requests/states`,
            params: `id=${document.URL.split('/')[4]}`
        });
        console.log(states)
        generateStates(states);
    } catch (error) {
        console.log(error);  
    }
}

function generateFiles(documents){
    const list = document.getElementById('list');
    const year = document.getElementById('year');
    if(documents.length > 0){
        for(let i of documents){
            const file = createElements('input', {type: 'submit', class: 'manager_button highlighted', value: `${i.filename}${i.extension}`});       
            const form = createContainer('form', {name: 'fileform', target: '_blank', method: 'POST', action: `/acompanharprocessos/${year.innerHTML}/${i.process}/${i._id}`}, [file]);
            list.appendChild(form);       
        }
    }else{
        const prgh = createElements('p', {style: 'display: inline'}, 'Este processo ainda não possuí arquivos.');
        list.style = ''
        list.appendChild(prgh);
    }    
}

function generateStates(states){
    const statesDiv = document.getElementById('statesdiv');
    for(let i of states){
        const label1 = createElements('label', {}, 'Status:&ensp;');
        const label2 = createElements('label', {}, 'Obs:&ensp;');
        const stateId = createElements('input', {type: 'hidden', name: 'elementid', value: i._id});        
        const prgh1 = createElements('p', {style: 'font-size: 0.8vw;'}, i.state);        
        const prgh2 = createElements('p', {style: 'font-size: 0.7vw; font-style: italic;'}, 'Sem observações');

        if(i.anotation){
            setAttributes(prgh2, {style: 'font-size: 0.8vw;'})
            prgh2.innerHTML = i.anotation            
        }

        const date = createElements('small', {},'');
        if(i.user){
            date.innerHTML = `<b>De:</b> ${i.user.pg} ${i.user.name} - ${i.date}`
        }else{
            date.innerHTML = `<b>De:</b> Sistema - ${i.date}`
        }
        
        const div1 = createContainer('div', {class: 'flexorientation--start'}, [label1, prgh1]);
        const div2 = createContainer('div', {class: 'flexorientation--start'}, [label2, prgh2]);
        const div3 = createContainer('div', {}, [date]);
        let block;
        
        if(i.state == 'Processo Cadastrado'){
            block = createContainer('form', {class: 'status_content display-column-spaceb create_state', name: 'statusblock', 
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Coleta de Orçamentos'){
            block = createContainer('div', {class: 'status_content display-column-spaceb getbudgets_state', name: 'statusblock', 
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Em Montagem'){
            block = createContainer('div', {class: 'status_content display-column-spaceb inprocess_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Montagem Finalizada'){
            block = createContainer('div', {class: 'status_content display-column-spaceb makedone_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Em Transferência'){
            block = createContainer('div', {class: 'status_content display-column-spaceb intransfer_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Em Análise'){
            block = createContainer('div', {class: 'status_content display-column-spaceb analysis_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Outro'){
            block = createContainer('div', {class: 'status_content display-column-spaceb other_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Retificando Processo'){
            block = createContainer('div', {class: 'status_content display-column-spaceb rectifying_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }
        else if(i.state == 'Processo Concluído'){
            block = createContainer('div', {class: 'status_content display-column-spaceb processdone_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);
        }else{
            block = createContainer('div', {class: 'status_content display-column-spaceb processdone_state', name: 'statusblock',
            }, [div1, div2, div3, stateId]);        
        }
        

        statesDiv.appendChild(block);        
    }
}