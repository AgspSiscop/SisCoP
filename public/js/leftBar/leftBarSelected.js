import {setAttributes} from '/js/builders/elementsFunctions.js';

if((document.URL).slice(21) == '/mensageiro/nova'){    
    setAttributes(document.getElementById('newmessage'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if((/\/(mensageiro)\/(caixadeentrada)([0-9]*)?\/?([a-z]*)?/).exec((document.URL).slice(21))){   
    setAttributes(document.getElementById('messagebox'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if((/\/(mensageiro)\/(enviadas)([0-9]*)?\/?([a-z]*)?/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('messagesents'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if((document.URL).slice(21) == '/novoprocesso/montagemdeprocesso' || (/\/(montagem)\/?([a-z]*)/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('processmaker'), {class: 'leftbar_itens leftbar_itens_selected'});   
}else{
    if((/\/(novoprocesso)\/?([a-z]*)/).exec((document.URL).slice(21))){
        setAttributes(document.getElementById('newprocess'), {class: 'leftbar_itens leftbar_itens_selected'}); 
    }
}
if((/\/(meusprocessos)\/?([a-z]*)/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('developmentprocess'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if((/\/(processosrecebidos)\/?([a-z]*)/).exec((document.URL).slice(21))){
    setAttributes(document.getElementById('processreceived'), {class: 'leftbar_itens leftbar_itens_selected'});
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
