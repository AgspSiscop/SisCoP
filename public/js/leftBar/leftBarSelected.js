import {setAttributes, clearContainer, appendElements, createElements} from '/js/builders/elementsFunctions.js';


document.addEventListener('click', (e) =>{   
    const element = e.target;
    if(element.id === 'messages'){        
        const messagesDiv = document.getElementById('messagesdiv');        
        if(messagesDiv.className === ''){
            messagesDiv.setAttribute('class', 'display_none')
        }else{
            messagesDiv.setAttribute('class', '')
        }
    }
    if(element.id === 'processes'){
        const processesDiv = document.getElementById('processesdiv');        
        if(processesDiv.className === ''){
            processesDiv.setAttribute('class', 'display_none')
        }else{
            processesDiv.setAttribute('class', '')
        }

    }
})

if((document.URL).slice(21) == '/mensageiro/nova'){    
    setAttributes(document.getElementById('newmessage'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('messagesdiv'), {class: ''});
}
if((/\/(mensageiro)\/(caixadeentrada)([0-9]*)?\/?([a-z]*)?/).exec((document.URL).slice(21))){   
    setAttributes(document.getElementById('messagebox'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('messagesdiv'), {class: ''});
}
if((/\/(mensageiro)\/(enviadas)([0-9]*)?\/?([a-z]*)?/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('messagesents'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('messagesdiv'), {class: ''});
}
if((/\/(mensageiro)\/(arquivadas)([0-9]*)?\/?([a-z]*)?/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('messagearchived'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('messagesdiv'), {class: ''});
}
if((document.URL).slice(21) == '/novoprocesso/montagemdeprocesso' || (/\/(montagem)\/?([a-z]*)/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('processmaker'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('processesdiv'), {class: ''});    
}else{
    if((/\/(novoprocesso)\/?([a-z]*)/).exec((document.URL).slice(21))){
        setAttributes(document.getElementById('newprocess'), {class: 'leftbar_subitens leftbar_subitens_selected'});
        setAttributes(document.getElementById('processesdiv'), {class: ''}); 
    }
}
if((/\/(meusprocessos)\/?([a-z]*)/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('developmentprocess'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('processesdiv'), {class: ''}); 
}
if((/\/(processosrecebidos)\/?([a-z]*)/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('processreceived'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('processesdiv'), {class: ''}); 
}
if((/\/(concluidos)\/?([a-z]*)/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('processdone'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('processesdiv'), {class: ''}); 
}
if((/\/(acompanharprocessos)\/?([a-z]*)/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('processmanager'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if(document.URL.split('/')[3] === 'register' || document.URL.split('/')[3] == 'saveregister'){
    setAttributes(document.getElementById('register'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if(document.URL.split('/')[3] === 'updateuser'){
    setAttributes(document.getElementById('updateuser'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if(document.URL.split('/')[3] === 'deleteuser'){
    setAttributes(document.getElementById('deleteuser'), {class: 'leftbar_itens leftbar_itens_selected'});
}
