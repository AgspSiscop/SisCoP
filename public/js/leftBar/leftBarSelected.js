import {setAttributes} from '/js/builders/elementsFunctions.js';

document.addEventListener('click', (e) =>{   
    const element = e.target;
    const arrowMsg = document.getElementById('arrowmsg');
    const arrowProcess = document.getElementById('arrowprocess');    
    if(element.id === 'messages' || element === arrowMsg){        
        const messagesDiv = document.getElementById('messagesdiv');        
        if(messagesDiv.className === ''){
            messagesDiv.setAttribute('class', 'display_none')
        }else{
            messagesDiv.setAttribute('class', '')
        }

        if(arrowMsg.className === 'leftbar_arrow_up' || arrowMsg.className === 'leftbar_arrow_rotate_up'){
            arrowMsg.className = 'leftbar_arrow_rotate_down'
        }else if(arrowMsg.className === 'leftbar_arrow_down' || arrowMsg.className === 'leftbar_arrow_rotate_down'){
            arrowMsg.className = 'leftbar_arrow_rotate_up'
        }

    }
    if(element.id === 'processes' || element === arrowProcess){
        const processesDiv = document.getElementById('processesdiv');        
        if(processesDiv.className === ''){
            processesDiv.setAttribute('class', 'display_none')
        }else{
            processesDiv.setAttribute('class', '')
        }

        if(arrowProcess.className === 'leftbar_arrow_up' || arrowProcess.className === 'leftbar_arrow_rotate_up'){
            arrowProcess.className = 'leftbar_arrow_rotate_down'
        }else if(arrowProcess.className === 'leftbar_arrow_down' || arrowProcess.className === 'leftbar_arrow_rotate_down'){
            arrowProcess.className = 'leftbar_arrow_rotate_up'
        }

    }
})

if(document.URL.split('/').some(x => x === 'nova')){    
    setAttributes(document.getElementById('newmessage'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('messagesdiv'), {class: ''});
    setAttributes(document.getElementById('arrowmsg'), {class: 'leftbar_arrow_up'});
    setAttributes(document.getElementById('arrowprocess'), {class: 'leftbar_arrow_down'});
}
if(document.URL.split('/').some(x => x === 'caixadeentrada')){   
    setAttributes(document.getElementById('messagebox'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('messagesdiv'), {class: ''});
    setAttributes(document.getElementById('arrowmsg'), {class: 'leftbar_arrow_up'});
    setAttributes(document.getElementById('arrowprocess'), {class: 'leftbar_arrow_down'});
}
if(document.URL.split('/').some(x => x === 'enviadas')){
    setAttributes(document.getElementById('messagesents'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('messagesdiv'), {class: ''});
    setAttributes(document.getElementById('arrowmsg'), {class: 'leftbar_arrow_up'});
    setAttributes(document.getElementById('arrowprocess'), {class: 'leftbar_arrow_down'});
}
if(document.URL.split('/').some(x => x === 'arquivadas')){
    setAttributes(document.getElementById('messagearchived'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('messagesdiv'), {class: ''});
    setAttributes(document.getElementById('arrowmsg'), {class: 'leftbar_arrow_up'});
    setAttributes(document.getElementById('arrowprocess'), {class: 'leftbar_arrow_down'});
}
if(document.URL.split('/').some(x => x === 'montagemdeprocesso') || document.URL.split('/').some(x => x === 'montagem')){
    setAttributes(document.getElementById('processmaker'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('processesdiv'), {class: ''}); 
    setAttributes(document.getElementById('arrowmsg'), {class: 'leftbar_arrow_down'});
    setAttributes(document.getElementById('arrowprocess'), {class: 'leftbar_arrow_up'});   
}else{
    if(document.URL.split('/').some(x => x === 'novoprocesso')){
        setAttributes(document.getElementById('newprocess'), {class: 'leftbar_subitens leftbar_subitens_selected'});
        setAttributes(document.getElementById('processesdiv'), {class: ''});
        setAttributes(document.getElementById('arrowmsg'), {class: 'leftbar_arrow_down'});
        setAttributes(document.getElementById('arrowprocess'), {class: 'leftbar_arrow_up'});  
    }
}
if(document.URL.split('/').some(x => x === 'meusprocessos')){
    setAttributes(document.getElementById('developmentprocess'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('processesdiv'), {class: ''});
    setAttributes(document.getElementById('arrowmsg'), {class: 'leftbar_arrow_down'});
    setAttributes(document.getElementById('arrowprocess'), {class: 'leftbar_arrow_up'}); 
}
if(document.URL.split('/').some(x => x === 'processosrecebidos')){
    setAttributes(document.getElementById('processreceived'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('processesdiv'), {class: ''});
    setAttributes(document.getElementById('arrowmsg'), {class: 'leftbar_arrow_down'});
    setAttributes(document.getElementById('arrowprocess'), {class: 'leftbar_arrow_up'}); 
}
if(document.URL.split('/').some(x => x === 'concluidos')){
    setAttributes(document.getElementById('processdone'), {class: 'leftbar_subitens leftbar_subitens_selected'});
    setAttributes(document.getElementById('processesdiv'), {class: ''});
    setAttributes(document.getElementById('arrowmsg'), {class: 'leftbar_arrow_down'});
    setAttributes(document.getElementById('arrowprocess'), {class: 'leftbar_arrow_up'}); 
}
if(document.URL.split('/').some(x => x === 'acompanharprocessos')){
    setAttributes(document.getElementById('processmanager'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if(document.URL.split('/').some(x => x === 'register') || document.URL.split('/').some(x => x === 'saveregister')){
    setAttributes(document.getElementById('register'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if(document.URL.split('/').some(x => x === 'updateuser')){
    setAttributes(document.getElementById('updateuser'), {class: 'leftbar_itens leftbar_itens_selected'});
}
if(document.URL.split('/').some(x => x === 'deleteuser')){
    setAttributes(document.getElementById('deleteuser'), {class: 'leftbar_itens leftbar_itens_selected'});
}
