(function readyJS(win, doc){
    'use strict';
    
    
    let formm =  doc.getElementById('formm');
    let section = doc.getElementById('messagesection');
    let  year = doc.getElementById('year');
    let process = doc.getElementById('process')

   

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
        
        
        ajax.open('POST', '/mensageiro/teste');
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function(){
            if(ajax.status === 200 && ajax.readyState === 4){                          
               for(let i of JSON.parse(ajax.responseText)){                
                let option = document.createElement('option');
                option.setAttribute('value', `${i._id}`);
                option.textContent = i.title
                process.appendChild(option);
               }               
            }    
        };
        ajax.send(params);
    });

})(window, document)