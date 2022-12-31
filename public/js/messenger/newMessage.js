(function readyJS(win, doc){
    'use strict';
    
    
    let formm =  doc.getElementById('formm');    
    let  year = doc.getElementById('year');
    let process = doc.getElementById('process');
    let send =  doc.getElementById('submitformm');

   send.addEventListener('click', () => {   
    let selected =  document.getElementById(process.value) || null;
    let title;
    console.log(selected)
    if(selected ==  null){
        title = 'Menssagem sem Processo';
        formm.setAttribute('action', `/mensageiro/novasemprocesso/${title}`);         
    }else{
        title = selected.innerHTML
        formm.setAttribute('action', `/mensageiro/nova/${title}`);
    }     
   });

    year.addEventListener('change', (e) => {
        let ajax =  new XMLHttpRequest();
        let params = 'year=' + year.value;
        for(let child of process.childNodes){
            if(child.nodeName == 'OPTION'){                
                child.remove()
            }
        }
        for(let child of process.childNodes){
            if(child.nodeName == 'OPTION'){                
                child.remove()
            }
        }        
        
        ajax.open('POST', '/mensageiro/processes');
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function(){
            if(ajax.status === 200 && ajax.readyState === 4){                          
               for(let i of JSON.parse(ajax.responseText)){                
                let option = document.createElement('option');                             
                option.setAttribute('value', `${i._id}`);
                option.setAttribute('id', `${i._id}`)
                option.textContent = i.title
                process.appendChild(option);                
                console.log(process)
               }               
            }    
        };
        ajax.send(params);
    });   

})(window, document)